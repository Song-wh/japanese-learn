package com.songwh.japaneselearn;

import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends BridgeActivity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // WebView 로드 후 JavaScript Interface 추가
        getBridge().getWebView().post(() -> {
            WebView webView = getBridge().getWebView();
            webView.addJavascriptInterface(new UrlExpander(), "UrlExpander");
        });
    }
    
    // URL 확장을 위한 JavaScript Interface
    public class UrlExpander {
        
        @JavascriptInterface
        public void expandUrl(String shortUrl, String callbackId) {
            new Thread(() -> {
                String expandedUrl = resolveUrl(shortUrl);
                
                // 결과를 JavaScript로 전달
                runOnUiThread(() -> {
                    WebView webView = getBridge().getWebView();
                    String jsCallback = String.format(
                        "window.urlExpanderCallback('%s', '%s')",
                        callbackId,
                        expandedUrl != null ? expandedUrl.replace("'", "\\'") : ""
                    );
                    webView.evaluateJavascript(jsCallback, null);
                });
            }).start();
        }
        
        private String resolveUrl(String shortUrl) {
            HttpURLConnection connection = null;
            try {
                URL url = new URL(shortUrl);
                connection = (HttpURLConnection) url.openConnection();
                connection.setInstanceFollowRedirects(false);
                connection.setRequestMethod("GET");
                connection.setConnectTimeout(5000);
                connection.setReadTimeout(5000);
                connection.connect();
                
                int responseCode = connection.getResponseCode();
                
                // 리다이렉션 응답이면 Location 헤더 반환
                if (responseCode >= 300 && responseCode < 400) {
                    String location = connection.getHeaderField("Location");
                    if (location != null) {
                        // 상대 경로인 경우 절대 경로로 변환
                        if (!location.startsWith("http")) {
                            URL baseUrl = new URL(shortUrl);
                            location = new URL(baseUrl, location).toString();
                        }
                        // 한번 더 리다이렉션 따라가기 (maps.app.goo.gl은 보통 2단계)
                        return resolveUrlRecursive(location, 3);
                    }
                }
                
                return shortUrl;
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            } finally {
                if (connection != null) {
                    connection.disconnect();
                }
            }
        }
        
        private String resolveUrlRecursive(String urlStr, int maxRedirects) {
            if (maxRedirects <= 0) return urlStr;
            
            HttpURLConnection connection = null;
            try {
                URL url = new URL(urlStr);
                connection = (HttpURLConnection) url.openConnection();
                connection.setInstanceFollowRedirects(false);
                connection.setRequestMethod("GET");
                connection.setConnectTimeout(5000);
                connection.setReadTimeout(5000);
                connection.connect();
                
                int responseCode = connection.getResponseCode();
                
                if (responseCode >= 300 && responseCode < 400) {
                    String location = connection.getHeaderField("Location");
                    if (location != null) {
                        if (!location.startsWith("http")) {
                            location = new URL(url, location).toString();
                        }
                        return resolveUrlRecursive(location, maxRedirects - 1);
                    }
                }
                
                return urlStr;
            } catch (Exception e) {
                return urlStr;
            } finally {
                if (connection != null) {
                    connection.disconnect();
                }
            }
        }
    }
}
