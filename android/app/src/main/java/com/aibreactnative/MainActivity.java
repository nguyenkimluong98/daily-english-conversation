package com.aibreactnative;

import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.v4.content.LocalBroadcastManager;

import com.aibreactnative.utils.AppUtils;
import com.example.ratedialog.RatingDialog;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    public static final String ACTION_SHOW_RATE = "com.aibreactnative.ACTION_SHOW_RATE";
    public static final String ACTION_SHOW_PROGRESS_DIALOG = "com.aibreactnative.ACTION_SHOW_PROGRESS_DIALOG";
    public static final String ACTION_HIDE_PROGRESS_DIALOG = "com.aibreactnative.ACTION_HIDE_PROGRESS_DIALOG";

    private final int REQUEST_CODE_NATIVE_AD_ACTIVITY = 112233;

    private BroadcastReceiver receiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (intent != null && intent.getAction() != null) {
                String action = intent.getAction();
                if (action.equalsIgnoreCase(ACTION_SHOW_RATE)) {
                    showRateDialog();
                }

                if (action.equalsIgnoreCase(ACTION_SHOW_PROGRESS_DIALOG)) {
                    String message = intent.getStringExtra("message");
                    boolean isCancelable = intent.getBooleanExtra("isCancelable", true);
                    showProgressDialog(message, isCancelable);
                }

                if (action.equalsIgnoreCase(ACTION_HIDE_PROGRESS_DIALOG)) {
                    hideProgressDialog();
                }
            }
        }
    };

    private ProgressDialog pDialog;

    @Override
    protected String getMainComponentName() {
        return "AIBReactNative";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onResume() {
        super.onResume();
        IntentFilter intentFilter = new IntentFilter(ACTION_SHOW_RATE);
        intentFilter.addAction(ACTION_SHOW_PROGRESS_DIALOG);
        intentFilter.addAction(ACTION_HIDE_PROGRESS_DIALOG);
        LocalBroadcastManager.getInstance(this).registerReceiver(receiver, intentFilter);
    }

    @Override
    protected void onPause() {
        super.onPause();
        LocalBroadcastManager.getInstance(this).unregisterReceiver(receiver);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK) {
            if (requestCode == REQUEST_CODE_NATIVE_AD_ACTIVITY) {
                finish();
            }
        }
    }

    private void showRateDialog() {
        RatingDialog ratingDialog = new RatingDialog(this);
        ratingDialog.setRatingDialogListener(new RatingDialog.RatingDialogInterFace() {
            @Override
            public void onDismiss() {
            }

            @Override
            public void onSubmit(float rating) {
                AppUtils.rateApp(MainActivity.this);
            }

            @Override
            public void onRatingChanged(float rating) {
            }
        });
        ratingDialog.showDialog();
    }

    private void showProgressDialog(String message, boolean isCancelable) {
        pDialog = new ProgressDialog(this);
        pDialog.setMessage(message);
        pDialog.setCancelable(isCancelable);
        pDialog.show();
    }

    private void hideProgressDialog() {
        if (pDialog != null && pDialog.isShowing()) {
            pDialog.dismiss();
        }
    }
}
