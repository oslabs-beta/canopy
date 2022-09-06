import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

import { current_component } from "svelte/internal" 
// import {writable } from 'svelte/store'

const ourBanner: Element | null = document.querySelector('.banner');

if (ourBanner) ourBanner.innerHTML = current_component // this used to be: `${window.location}`;

export default app;