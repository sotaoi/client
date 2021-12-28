import { BootstrapOptions } from '@sotaoi/client/bootstrap';

class SettingsService {
  public bootstrapOptions: BootstrapOptions;
  constructor(bootstrapOptions: BootstrapOptions) {
    this.bootstrapOptions = bootstrapOptions;
  }
}

export { SettingsService };
