package com.songwh.japaneselearn;

import android.os.Bundle;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends BridgeActivity {
    
    private static final String TAG = "UrlExpander";
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // WebView 로드 후 JavaScript Interface 추가
        getBridge().getWebView().post(() -> {
            WebView webView = getBridge().getWebView();
            webView.addJavascriptInterface(new UrlExpander(), "UrlExpander");
            Log.d(TAG, "UrlExpander JavaScript Interface 등록됨");
        });
    }
    
    // URL 확장을 위한 JavaScript Interface
    public class UrlExpander {
        
        @JavascriptInterface
        public void expandUrl(String shortUrl, String callbackId) {
            Log.d(TAG, "expandUrl 호출됨: " + shortUrl);
            
            new Thread(() -> {
                String expandedUrl = resolveUrlRecursive(shortUrl, 10);
                Log.d(TAG, "최종 URL: " + expandedUrl);
                
                // 결과를 JavaScript로 전달
                runOnUiThread(() -> {
                    WebView webView = getBridge().getWebView();
                    String safeUrl = expandedUrl != null ? 
                        expandedUrl.replace("\\", "\\\\").replace("'", "\\'") : "";
                    String jsCallback = String.format(
                        "if(window.urlExpanderCallback) window.urlExpanderCallback('%s', '%s')",
                        callbackId,
                        safeUrl
                    );
                    Log.d(TAG, "JS 콜백 실행: " + jsCallback);
                    webView.evaluateJavascript(jsCallback, null);
                });
            }).start();
        }
        
        private String resolveUrlRecursive(String urlStr, int maxRedirects) {
            if (maxRedirects <= 0) {
                Log.d(TAG, "최대 리다이렉션 도달: " + urlStr);
                return urlStr;
            }
            
            HttpURLConnection connection = null;
            try {
                Log.d(TAG, "URL 요청: " + urlStr + " (남은 리다이렉션: " + maxRedirects + ")");
                
                URL url = new URL(urlStr);
                connection = (HttpURLConnection) url.openConnection();
                connection.setInstanceFollowRedirects(false);
                connection.setRequestMethod("GET");
                connection.setConnectTimeout(10000);
                connection.setReadTimeout(10000);
                
                // 브라우저처럼 보이도록 User-Agent 설정
                connection.setRequestProperty("User-Agent", 
                    "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36");
                connection.setRequestProperty("Accept", 
                    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
                
                connection.connect();
                
                int responseCode = connection.getResponseCode();
                Log.d(TAG, "응답 코드: " + responseCode);
                
                // 리다이렉션 응답
                if (responseCode >= 300 && responseCode < 400) {
                    String location = connection.getHeaderField("Location");
                    Log.d(TAG, "Location 헤더: " + location);
                    
                    if (location != null && !location.isEmpty()) {
                        // 상대 경로인 경우 절대 경로로 변환
                        if (!location.startsWith("http")) {
                            location = new URL(url, location).toString();
                        }
                        return resolveUrlRecursive(location, maxRedirects - 1);
                    }
                }
                
                // 200 OK 또는 리다이렉션 끝
                Log.d(TAG, "최종 도달 URL: " + urlStr);
                return urlStr;
                
            } catch (Exception e) {
                Log.e(TAG, "URL 처리 오류: " + e.getMessage());
                e.printStackTrace();
                return urlStr;
            } finally {
                if (connection != null) {
                    connection.disconnect();
                }
            }
        }
    }
}
