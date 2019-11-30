package com.aibreactnative.modules.share;

import android.content.ActivityNotFoundException;
import android.net.Uri;
import android.support.annotation.Nullable;

import com.aibreactnative.modules.share.social.EmailShare;
import com.aibreactnative.modules.share.social.FacebookPagesManagerShare;
import com.aibreactnative.modules.share.social.FacebookShare;
import com.aibreactnative.modules.share.social.GenericShare;
import com.aibreactnative.modules.share.social.GooglePlusShare;
import com.aibreactnative.modules.share.social.InstagramShare;
import com.aibreactnative.modules.share.social.ShareIntent;
import com.aibreactnative.modules.share.social.TwitterShare;
import com.aibreactnative.modules.share.social.WhatsAppShare;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.HashMap;
import java.util.Map;


public class RNShareModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private enum SHARES {
        facebook,
        generic,
        pagesmanager,
        twitter,
        whatsapp,
        instagram,
        googleplus,
        email;

        public static ShareIntent getShareClass(String social, ReactApplicationContext reactContext) {
            SHARES share = valueOf(social);
            switch (share) {
                case generic:
                    return new GenericShare(reactContext);
                case facebook:
                    return new FacebookShare(reactContext);
                case pagesmanager:
                    return new FacebookPagesManagerShare(reactContext);
                case twitter:
                    return new TwitterShare(reactContext);
                case whatsapp:
                    return new WhatsAppShare(reactContext);
                case instagram:
                    return new InstagramShare(reactContext);
                case googleplus:
                    return new GooglePlusShare(reactContext);
                case email:
                    return new EmailShare(reactContext);
                default:
                    return null;
            }
        }
    };

    public RNShareModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
    return "RNShare";
    }

    @javax.annotation.Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();
        for (SHARES val: SHARES.values()) {
            constants.put(val.toString().toUpperCase(), val.toString());
        }
        return constants;
    }

    @ReactMethod
    public void open(ReadableMap options, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        try{
            GenericShare share = new GenericShare(this.reactContext);
            share.open(options);
            successCallback.invoke("OK");
        }catch(ActivityNotFoundException ex) {
            System.out.println("ERROR");
            System.out.println(ex.getMessage());
            failureCallback.invoke("not_available");
        }catch (Exception e) {
            System.out.println("ERROR");
            System.out.println(e.getMessage());
            failureCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void shareSingle(ReadableMap options, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        System.out.println("SHARE SINGLE METHOD");
        if (ShareIntent.hasValidKey("social", options) ) {
            try{
                ShareIntent shareClass = SHARES.getShareClass(options.getString("social"), this.reactContext);
                if (shareClass != null && shareClass instanceof ShareIntent) {
                    shareClass.open(options);
                    successCallback.invoke("OK");
                } else {
                    throw new ActivityNotFoundException("Invalid share activity");
                }
            }catch(ActivityNotFoundException ex) {
                System.out.println("ERROR");
                System.out.println(ex.getMessage());
                failureCallback.invoke(ex.getMessage());
            }catch (Exception e) {
                System.out.println("ERROR");
                System.out.println(e.getMessage());
                failureCallback.invoke(e.getMessage());
            }
        } else {
            failureCallback.invoke("key 'social' missing in options");
        }
    }

    @ReactMethod
    public void isBase64File(String url, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        try {
            Uri uri = Uri.parse(url);
            String scheme = uri.getScheme();
            if((scheme != null) && scheme.equals("data")) {
                successCallback.invoke(true);
            } else {
                successCallback.invoke(false);
            }
        } catch (Exception e) {
            System.out.println("ERROR");
            System.out.println(e.getMessage());
            failureCallback.invoke(e.getMessage());
        }
    }
}
