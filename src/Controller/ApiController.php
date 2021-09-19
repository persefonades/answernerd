<?php

namespace App\Controller;

use App\Repository\AnswerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class ApiController extends AbstractController
{
    public function __construct()
    {
        $this->encoders = [new XmlEncoder(), new JsonEncoder()];
        $this->normalizers = [new ObjectNormalizer()];

        $this->serializer = new Serializer($this->normalizers, $this->encoders);
    }

    /**
     * @Route("/api", name="api")
     */
    public function index(): Response
    {
        return $this->render('api/index.html.twig', [
            'controller_name' => 'ApiController',
        ]);
    }

    /**
     * @Route("/api/nerd/auth", name="api_auth_user", methods="POST")
     */
    public function get_auth_user(Request $req)
    {
        if ($req->request->get('fields')) {
            $fields = json_decode($req->request->get('fields'), true);
            if ($this->getUser() && $fields) {
                $user = json_decode(
                    $this->serializer->serialize($this->getUser(), 'json'),
                    true
                );
                $data = [];
                foreach ($fields as $field) {
                    $data[$field] = $user[$field];
                }
                return new JsonResponse([
                    'success' => true,
                    'data' => $data,
                ]);
            } else {
                return new JsonResponse([
                    'success' => true,
                    'data' => null,
                ]);
            }
        }
        return new JsonResponse([
            'success' => false,
            'code' => 400,
            'message' => 'Invalid Request! No variables found!',
        ]);
    }

    /**
     * @Route("/api/article/id", name="api_article_id", methods="POST")
     */
    public function get_article_id(Request $req, AnswerRepository $a_rep)
    {
        $article_id = $req->request->get('id');
        $fields = json_decode($req->request->get('fields'), true);
        if ($article_id && $fields) {
            $article = $a_rep->find_one_by_field('id', $article_id);
            if ($article) {
                $article = json_decode(
                    $this->serializer->serialize($article, 'json'),
                    true
                );
                $data = [];
                foreach ($fields as $field) {
                    $data[$field] = $article[$field];
                }
                return new JsonResponse([
                    'success' => true,
                    'data' => $data,
                ]);
            }
            return new JsonResponse([
                'success' => true,
                'data' => null,
            ]);
        }
        return new JsonResponse([
            'success' => false,
            'code' => 400,
            'message' => 'Invalid Request! No variables found!',
        ]);
    }
}
