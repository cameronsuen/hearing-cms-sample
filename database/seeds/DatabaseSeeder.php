<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
		$users = array(
			['username' => 'test', 'email' => 'test@test.com', 'password' => Hash::make('12345'), 'role' => 400],
			['username' => 'test2', 'email' => 'test2@test.com', 'password' => Hash::make('12345'), 'role' => 300],
			['username' => 'test3', 'email' => 'test3@test.com', 'password' => Hash::make('12345'), 'role' => 200],
			['username' => 'test4', 'email' => 'test4@test.com', 'password' => Hash::make('12345'), 'role' => 100]
		);


		foreach($users as $user)
		{
			User::create($user);
		}

		Model::reguard();
    }
}
