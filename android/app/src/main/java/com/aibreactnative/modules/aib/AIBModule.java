package com.aibreactnative.modules.aib;

import android.content.Context;
import android.content.Intent;
import android.support.v4.content.LocalBroadcastManager;

import com.aibreactnative.MainActivity;
import com.aibreactnative.utils.AppUtils;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AIBModule extends ReactContextBaseJavaModule {

    private Context context;

    public AIBModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return AIBModule.class.getSimpleName();
    }

    @ReactMethod
    public void rateApp() {
        LocalBroadcastManager.getInstance(context)
                .sendBroadcast(new Intent(MainActivity.ACTION_SHOW_RATE));
    }

    @ReactMethod
    public void moreApp(String pkg) {
        AppUtils.moreApp(context, pkg);
    }

    @ReactMethod
    public void showProgressDialog(String message, boolean isCancelable) {
        LocalBroadcastManager.getInstance(context)
                .sendBroadcast(
                        new Intent(MainActivity.ACTION_SHOW_PROGRESS_DIALOG)
                                .putExtra("message", message)
                                .putExtra("isCancelable", isCancelable));
    }

    @ReactMethod
    public void hideProgressDialog() {
        LocalBroadcastManager.getInstance(context)
                .sendBroadcast(new Intent(MainActivity.ACTION_HIDE_PROGRESS_DIALOG));
    }

}
