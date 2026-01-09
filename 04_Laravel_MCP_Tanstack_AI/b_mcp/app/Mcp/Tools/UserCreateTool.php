<?php

namespace App\Mcp\Tools;

use App\Models\User;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;

class UserCreateTool extends Tool
{

     /**
     * The tool's name.
     */
    protected string $name = 'create-user';

    /**
     * The tool's title.
     */
    protected string $title = 'Create user in the database';


    /**
     * The tool's description.
     */
    protected string $description = <<<'MARKDOWN'
       This tool creates a new user with the given name and email address.
    MARKDOWN;

    /**
     * Handle the tool request.
     */
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        return Response::json($user, 201);
    }

    /**
     * Get the tool's input schema.
     *
     * @return array<string, \Illuminate\Contracts\JsonSchema\JsonSchema>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'name' => $schema->string()->description('The name of the user'),
            'email' => $schema->string()->description('The email address of the user'),
        ];
    }
}
