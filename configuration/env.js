const IBMCloudEnv = require('ibm-cloud-env');

IBMCloudEnv.init("/mapping.json");

module.exports = IBMCloudEnv;