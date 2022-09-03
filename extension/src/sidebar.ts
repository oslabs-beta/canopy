import { current_component } from "svelte/internal" 
// import {writable } from 'svelte/store'

const ourBanner: Element | null = document.querySelector('.banner');

if (ourBanner) ourBanner.innerHTML = current_component // this used to be: `${window.location}`;

