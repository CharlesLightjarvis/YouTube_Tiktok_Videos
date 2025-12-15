<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
class PostController extends Controller
{
    use AuthorizesRequests;

    public function index() {
        return Post::all();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $validated = $request->validate([
            'content' => 'required|string|max:255',
        ]);

        $post->update($validated);

        return response()->json([
            'message' => 'Post updated successfully',
            'post' => $post
        ], 200);
            
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        $post->delete();
        return response()->noContent();
    }
}
