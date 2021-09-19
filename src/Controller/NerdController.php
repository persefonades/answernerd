<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NerdController extends AbstractController
{
    /**
     * @Route("/nerd", name="user_dashboard")
     */
    public function index(): Response
    {
        return $this->render('nerd/index.html.twig', [
            'controller_name' => 'NerdController',
        ]);
    }

    /**
     * @Route("/nerd/settings", name="user_settings")
     */
    public function settings(): Response
    {
        return $this->render('nerd/settings.html.twig');
    }

}
