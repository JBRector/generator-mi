import {checkWebP} from './modules/support-webp';

// Check for JS support
document.documentElement.classList.remove('no-js');

// Check for WebP support
checkWebP();
