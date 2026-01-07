package com.songwh.japaneselearn;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends BridgeActivity {
    
    private static final String TAG = "UrlExpander";
    private Handler mainHandler = new Handler(Looper.getMainLooper());
    
    @Override
    public void onStart() {
        super.onStart();
        
        // 여러 번 시도하여 JavaScript Interface 등록
        registerJsInterface();
    }
    
    private void registerJsInterface() {
        mainHandler.postDelayed(() -> {
            try {
                WebView webView = getBridge().getWebView();
                if (webView != null) {
                    webView.addJavascriptInterface(new UrlExpander(), "UrlExpander");
                    Log.d(TAG, "✅ UrlExpander JavaScript Interface 등록 성공!");
                    
                    // JavaScript에 등록 완료 알림
                    webView.evaluateJavascript(
                        "console.log('UrlExpander 등록됨:', typeof window.UrlExpander);",
                        null
                    );
                } else {
                    Log.e(TAG, "WebView가 null입니다. 재시도...");
                    mainHandler.postDelayed(this::registerJsInterface, 500);
                }
            } catch (Exception e) {
                Log.e(TAG, "등록 실패: " + e.getMessage());
                mainHandler.postDelayed(this::registerJsInterface, 500);
            }
        }, 1000);
    }
    
    // URL 확장을 위한 JavaScript Interface
    public class UrlExpander {
        
        @JavascriptInterface
        public String expandUrlSync(String shortUrl) {
            Log.d(TAG, "expandUrlSync 호출: " + shortUrl);
            String result = resolveUrlRecursive(shortUrl, 10);
            Log.d(TAG, "expandUrlSync 결과: " + result);
            return result != null ? result : "";
        }
        
        @JavascriptInterface
        public void expandUrl(String shortUrl, String callbackId) {
            Log.d(TAG, "expandUrl 호출: " + shortUrl + ", callback: " + callbackId);
            
            new Thread(() -> {
                String expandedUrl = resolveUrlRecursive(shortUrl, 10);
                Log.d(TAG, "확장 결과: " + expandedUrl);
                
                mainHandler.post(() -> {
                    try {
                        WebView webView = getBridge().getWebView();
                        String safeUrl = expandedUrl != null ? 
                            expandedUrl.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "") : "";
                        String jsCallback = "if(window.urlExpanderCallback){window.urlExpanderCallback('" + 
                            callbackId + "','" + safeUrl + "');}";
                        Log.d(TAG, "JS 콜백: " + jsCallback);
                        webView.evaluateJavascript(jsCallback, null);
                    } catch (Exception e) {
                        Log.e(TAG, "콜백 실행 오류: " + e.getMessage());
                    }
                });
            }).start();
        }
        
        @JavascriptInterface
        public boolean isAvailable() {
            Log.d(TAG, "isAvailable 호출됨");
            return true;
        }
        
        private String resolveUrlRecursive(String urlStr, int maxRedirects) {
            if (maxRedirects <= 0 || urlStr == null) {
                return urlStr;
            }
            
            HttpURLConnection connection = null;
            try {
                Log.d(TAG, "URL 요청: " + urlStr);
                
                URL url = new URL(urlStr);
                connection = (HttpURLConnection) url.openConnection();
                connection.setInstanceFollowRedirects(false);
                connection.setRequestMethod("GET");
                connection.setConnectTimeout(10000);
                connection.setReadTimeout(10000);
                connection.setRequestProperty("User-Agent", 
                    "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36");
                connection.connect();
                
                int responseCode = connection.getResponseCode();
                Log.d(TAG, "응답: " + responseCode);
                
                if (responseCode >= 300 && responseCode < 400) {
                    String location = connection.getHeaderField("Location");
                    Log.d(TAG, "Location: " + location);
                    
                    if (location != null && !location.isEmpty()) {
                        if (!location.startsWith("http")) {
                            location = new URL(url, location).toString();
                        }
                        return resolveUrlRecursive(location, maxRedirects - 1);
                    }
                }
                
                return urlStr;
            } catch (Exception e) {
                Log.e(TAG, "오류: " + e.getMessage());
                return urlStr;
            } finally {
                if (connection != null) {
                    connection.disconnect();
                }
            }
        }
    }
}
