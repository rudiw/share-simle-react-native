package com.sharesample;

import com.facebook.react.ReactActivity;
import android.content.Intent; // <-- include if not already there
import com.tkporter.sendsms.SendSMSPackage;
import android.content.res.AssetManager;
import java.io.IOException;
import android.util.Log;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.File;
import java.io.FileOutputStream;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    final AssetManager assetManager = getAssets();
    String[] files = null;

    try {
        files = assetManager.list("pdf");
    } catch (IOException e) {
        Log.e("tag", "Failed to get asset file list.", e);
    }

    if (files != null) for (String filename : files) {
        InputStream in = null;
        OutputStream out = null;

        try {
            in = assetManager.open("pdf/" + filename);

            File outFile = new File(getFilesDir(), filename);
            out = new FileOutputStream(outFile);
            copyFile(in, out);
            Log.e("tag", "Copy was a success: " + outFile.getPath());
        } catch(IOException e) {
            Log.e("tag", "Failed to copy asset file: " + "pdf/" + filename, e);
        }
        finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    // NOOP
                }
            }
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    // NOOP
                }
            }
        }
    }
    }

    private void copyFile(InputStream in, OutputStream out) throws IOException {
        byte[] buffer = new byte[1024];
        int read;
        while((read = in.read(buffer)) != -1){
        out.write(buffer, 0, read);
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ShareSample";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        //probably some other stuff here
        SendSMSPackage.getInstance().onActivityResult(requestCode, resultCode, data);
    }
}
