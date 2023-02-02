package com.reactnativecommunity.clipboard;

import androidx.annotation.Nullable;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.ViewManagerOnDemandReactPackage;
import com.facebook.react.bridge.ModuleSpec;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.module.annotations.ReactModuleList;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nonnull;

@ReactModuleList(
        nativeModules = {
                ClipboardModule.class,
        })
public class ClipboardPackage extends TurboReactPackage implements ViewManagerOnDemandReactPackage {

  /** {@inheritDoc} */
  @Override
  public List<String> getViewManagerNames(ReactApplicationContext reactContext) {
    return null;
  }

  @Override
  protected List<ModuleSpec> getViewManagers(ReactApplicationContext reactContext) {
    return null;
  }

  /** {@inheritDoc} */
  @Override
  public @Nullable ViewManager createViewManager(
          ReactApplicationContext reactContext, String viewManagerName) {
    return null;
  }

  @Override
  public NativeModule getModule(String name, @Nonnull ReactApplicationContext reactContext) {
    switch (name) {
      case ClipboardModule.NAME:
        return new ClipboardModule(reactContext);
      default:
        return null;
    }
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    try {
      Class<?> reactModuleInfoProviderClass =
              Class.forName("com.reactnativecommunity.clipboard.ClipboardPackage$$ReactModuleInfoProvider");
      return (ReactModuleInfoProvider) reactModuleInfoProviderClass.newInstance();
    } catch (ClassNotFoundException e) {
      // ReactModuleSpecProcessor does not run at build-time. Create this ReactModuleInfoProvider by
      // hand.
      return new ReactModuleInfoProvider() {
        @Override
        public Map<String, ReactModuleInfo> getReactModuleInfos() {
          final Map<String, ReactModuleInfo> reactModuleInfoMap = new HashMap<>();

          Class<? extends NativeModule>[] moduleList =
                  new Class[] {
                          ClipboardModule.class,
                  };

          for (Class<? extends NativeModule> moduleClass : moduleList) {
            ReactModule reactModule = moduleClass.getAnnotation(ReactModule.class);

            reactModuleInfoMap.put(
                    reactModule.name(),
                    new ReactModuleInfo(
                            reactModule.name(),
                            moduleClass.getName(),
                            reactModule.canOverrideExistingModule(),
                            reactModule.needsEagerInit(),
                            reactModule.hasConstants(),
                            reactModule.isCxxModule(),
                            TurboModule.class.isAssignableFrom(moduleClass)));
          }

          return reactModuleInfoMap;
        }
      };
    } catch (InstantiationException | IllegalAccessException e) {
      throw new RuntimeException(
              "No ReactModuleInfoProvider for com.reactnativecommunity.clipboard.ClipboardPackage$$ReactModuleInfoProvider", e);
    }
  }
  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    modules.add(new ClipboardModule(reactContext));

    return modules;
  }
}
