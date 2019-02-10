/*
 * Copyright (c) 2010-2019 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   SAP - initial API and implementation
 */

/**
 * API v4 Files
 * 
 * Note: This module is supported only with the Mozilla Rhino engine
 */

var streams = require('io/v4/streams');
var bytes = require("io/v4/bytes");

/**
 * Encode the input (text or byte array) as text
 */
exports.encode = function(input) {
	return bytes.byteArrayToText(exports.encodeNative(input));
};

/**
 * Encode the input (text or byte array) as byte array
 */
exports.encodeBytes = function(input) {
	return bytes.toJavaScriptBytes(exports.encodeNative(input));
};

/**
 * Encode the input (text or byte array) as java native byte array
 */
exports.encodeNative = function(input) {
	var data = input;
	var native;
	if (typeof data === 'string') {
		var baos = streams.createByteArrayOutputStream();
		baos.writeText(data);
		native = baos.getBytesNative();
	} else if (Array.isArray(data)) {
		native = bytes.toJavaBytes(data);
	}
	
	var output = org.eclipse.dirigible.api.v3.utils.Base64Facade.encodeNative(native);
	return output;
};

/**
 * Decode the input (text or byte array) as text
 */
exports.decode = function(input) {
	var output = exports.decodeNative(input);
	if (output && output !== null) {
		var result = bytes.toJavaScriptBytes(output);
		return result;
	}
	return output;
};

/**
 * Decode the input (text or byte array) as java native byte array
 */
exports.decodeNative = function(input) {
	var data = input;
	var native;
	if (typeof data === 'string') {
		var baos = streams.createByteArrayOutputStream();
		baos.writeText(data);
		native = baos.getBytesNative();
	} else if (Array.isArray(data)) {
		native = bytes.toJavaBytes(data);
	}
	var output = org.eclipse.dirigible.api.v3.utils.Base64Facade.decodeNative(native);
	return output;
};

