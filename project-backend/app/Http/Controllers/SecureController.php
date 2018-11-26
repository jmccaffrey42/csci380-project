<?php
/**
 * Created by IntelliJ IDEA.
 * User: jmcca
 * Date: 11/25/2018
 * Time: 9:38 PM
 */

namespace App\Http\Controllers;


abstract class SecureController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
}
