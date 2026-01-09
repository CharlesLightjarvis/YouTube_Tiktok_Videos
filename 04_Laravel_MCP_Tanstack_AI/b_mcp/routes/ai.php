<?php

use App\Mcp\Servers\UserCreateServer;
use App\Mcp\Servers\UserServer;
use App\Mcp\Servers\WeatherServer;
use Laravel\Mcp\Facades\Mcp;

// Mcp::web('/mcp/demo', \App\Mcp\Servers\PublicServer::class);

// For development/testing without authentication
Mcp::web('/mcp/weather', WeatherServer::class);
Mcp::web('/mcp/user', UserCreateServer::class);

// For production with authentication
// Mcp::web('/mcp/weather', WeatherServer::class)
//     ->middleware(['throttle:mcp']);

// Mcp::local('weather', WeatherServer::class);
