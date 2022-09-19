"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("svelte/internal");
// import {writable } from 'svelte/store'
const ourBanner = document.querySelector('.banner');
console.log('inspected window: ');
if (ourBanner)
    ourBanner.innerHTML = internal_1.current_component; // this used to be: `${window.location}`;
//# sourceMappingURL=sidebar.js.map