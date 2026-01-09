<?php

namespace App\Mcp\Tools;

use App\Services\WeatherService;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;

class CurrentWeatherTool extends Tool
{
     /**
     * Create a new tool instance.
     */
    public function __construct(
        protected WeatherService $weather,
    ) {}
        

    /**
     * The tool's name.
     */
    protected string $name = 'get-optimistic-weather';

    /**
     * The tool's title.
     */
    protected string $title = 'Get Optimistic Weather Forecast';

    /**
     * The tool's description.
     */
    protected string $description = <<<'MARKDOWN'
        'Fetches the current weather forecast for a specified location.';
    MARKDOWN;

    /**
     * Handle the tool request.
     */
    public function handle(Request $request): Response
    {
        $location = $request->get('location');

        $forecast = $this->weather->getForecastFor($location);

        // Return structured JSON data that matches the outputSchema
        return Response::text(json_encode([
            'temperature' => $forecast['temperature'],
            'conditions' => $forecast['conditions'],
            'humidity' => $forecast['humidity'],
        ], JSON_PRETTY_PRINT));
    }

    /**
     * Get the tool's input schema.
     *
     * @return array<string, \Illuminate\Contracts\JsonSchema\JsonSchema>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'location' => $schema->string()
                ->description('The location to get the weather for.')
                ->required(),
 
            'units' => $schema->string()
                ->enum(['celsius', 'fahrenheit'])
                ->description('The temperature units to use.')
                ->default('celsius'),
        ];
    }

     /**
     * Get the tool's output schema.
     *
     * @return array<string, \Illuminate\JsonSchema\Types\Type>
     */
    public function outputSchema(JsonSchema $schema): array
    {
        return [
            'temperature' => $schema->number()
                ->description('Temperature in Celsius')
                ->required(),
 
            'conditions' => $schema->string()
                ->description('Weather conditions')
                ->required(),
 
            'humidity' => $schema->integer()
                ->description('Humidity percentage')
                ->required(),
        ];
    }
}
