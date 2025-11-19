<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class SalesBusinessDevController extends Controller
{
    public function index(): View
    {
        $modules = [
            [
                'number' => 1,
                'title' => 'HubSpot Automation',
                'badge' => 'Foundation',
                'description' => 'Automate CRM workflows and lead management with HubSpot and AI.',
                'features' => ['CRM automation', 'Lead management', 'Pipeline optimisation'],
                'duration' => '45 min',
                'lessons' => 5,
                'progress' => 0,
            ],
            [
                'number' => 2,
                'title' => 'Proposal Generation',
                'badge' => 'Advanced',
                'description' => 'Generate professional proposals and quotes using AI assistance.',
                'features' => ['Proposal templates', 'Customisation', 'Client personalisation'],
                'duration' => '45 min',
                'lessons' => 5,
                'progress' => 0,
            ],
            [
                'number' => 3,
                'title' => 'Lead Qualification',
                'badge' => 'Expert',
                'description' => 'Qualify and prioritise leads using AI-powered analysis tools.',
                'features' => ['Lead scoring', 'Qualification criteria', 'Priority ranking'],
                'duration' => '30 min',
                'lessons' => 4,
                'progress' => 0,
            ],
        ];

        return view('pages.sales-business-dev', compact('modules'));
    }
}

