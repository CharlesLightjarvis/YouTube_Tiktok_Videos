<?php

namespace App\Services;

class WeatherService
{
    /**
     * Get the weather forecast for a given location.
     */
    public function getForecastFor(string $location): array
    {
        // Simulate API call - in real app, you'd call a weather API
        $conditions = ['sunny', 'cloudy', 'rainy', 'partly cloudy', 'clear'];
        $randomCondition = $conditions[array_rand($conditions)];
        $temperature = rand(15, 30);
        $humidity = rand(40, 90);

        return [
            'location' => $location,
            'temperature' => $temperature,
            'conditions' => $randomCondition,
            'humidity' => $humidity,
        ];
    }
}
