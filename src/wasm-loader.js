/*
 * Load a WASM module from the remote url
 *
 * @param {String} url
 * @param {Object} importObject
 * @return {WebAssembly.Instance}
 */
export async function loadWasm(url, importObject) {
	// const result = await WebAssembly.instantiateStreaming(fetch(url), importObject || {});
    // return result.instance;

	const response = await fetch(url);
	const buffer = await response.arrayBuffer();
	const module = await WebAssembly.instantiate(buffer, importObject);
	
	return module.instance;    
}