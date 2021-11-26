const OmniHelper = require('@sotaoi/omni/helper').Helper;

class Helper extends OmniHelper {
  static setTitle(title) {
    switch (true) {
      case this.isWeb():
        document.title = title;
        break;
      case this.isMobile():
        // nothing here yet
        break;
      case this.isElectron():
        console.warn('nothing here yet');
        break;
      default:
        throw new Error('Unknown environment');
    }
  }

  static uuid() {
    let uuid = '',
      i,
      random;
    for (i = 0; i < 32; i++) {
      random = (Math.random() * 16) | 0;
      if (i == 8 || i == 12 || i == 16 || i == 20) {
        uuid += '-';
      }
      uuid += (i == 12 ? 4 : i == 16 ? (random & 3) | 8 : random).toString(16);
    }
    return uuid;
  }

  static isWeb() {
    return typeof document !== 'undefined';
  }

  static isMobile() {
    return typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
  }

  static isElectron() {
    try {
      return (
        typeof navigator !== 'undefined' &&
        typeof navigator.userAgent !== 'undefined' &&
        navigator.userAgent.toLowerCase().indexOf(' electron/') > -1
      );
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  static encodeSegment(segment) {
    const encodedSegment = [];
    Object.entries(segment).map(([key, value]) => {
      encodedSegment.push(`${key}=${encodeURIComponent(typeof value === 'string' ? value : JSON.stringify(value))}`);
    });
    return encodedSegment.join('&');
  }

  static decodeSegment(segment) {
    if (typeof segment !== 'string') {
      return {};
    }
    const decodedSegment = {};
    const segments = segment.split('&');
    segments.map((segment) => {
      const split = segment.split('=');
      decodedSegment[split[0]] = split[1] || true;
    });
    return decodedSegment;
  }

  static asset(item, role = 'assets') {
    item = typeof item === 'object' ? JSON.stringify(item) : item;
    if (!item) {
      return null;
    }
    if (!this.isJson(item)) {
      return item;
    }
    const parsed = JSON.parse(item);
    if (!parsed) {
      return null;
    }
    return `/api/storage/${parsed.drive}/${role}/${parsed.domain}/${parsed.pathname}`;
  }
}

module.exports = { Helper };
