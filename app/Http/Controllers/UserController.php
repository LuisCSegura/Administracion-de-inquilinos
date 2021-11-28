<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;



class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return User::all();
        return User::where('administrator', 0)->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $this->validateUser();
            $user = new User(request(['name', 'email']));
            $user->password=Hash::make(request('password'));
            $user->administrator=0;
            $user->save();
            return $user;
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $this->validateEditedUser();
            $user = User::findOrFail($id);
            $user->name=$request->name;
            $user->email=$request->email;
            if($request->password !=''){
                $user->password=Hash::make($request->password);
            }
            $user->update();
            return $user;
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return $user;
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    protected function validateUser()
    {
        return request()->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);
    }
    protected function validateEditedUser()
    {
        return request()->validate([
            'name' => 'required',
            'email' => 'required'
        ]);
    }
    public function updateProfile(Request $request)
    {
        try {
            $reqUser=json_decode($request->user);
            $user = User::findOrFail($reqUser->id);
            if($request->hasFile('image')){
                $file=$request->file('image');
                $filename=$file->getClientOriginalName();
                if(File::exists(public_path('storage/profile_images/'.$reqUser->id))) {
                    File::deleteDirectory(public_path('storage/profile_images/'.$reqUser->id));
                }
                $file->storeAs('profile_images/'.$reqUser->id.'/', $filename, 'public');
                $user->profile_image=$filename;
            }
            $user->name=$reqUser->name;
            $user->email=$reqUser->email;
            if($reqUser->password !=''){
                $user->password=Hash::make($reqUser->password);
            }
            $user->update();
            return $user;
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
}
