/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var platform = document.getElementById("platform");
        var version = document.getElementById("version");
        var uuid = document.getElementById("uuid");
        var model = document.getElementById("model");
        var connection = document.getElementById("connection");

        // Recuperer les informations avec cordova
        p_value = device.platform;
        v_value = device.version;
        u_value = device.uuid;
        m_value = device.model;
        c_value = navigator.connection.type;

        platform.value = p_value;
        version.value = v_value;
        uuid.value = u_value;
        model.value = m_value;
        connection.value = c_value;
    }
};

app.initialize();