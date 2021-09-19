<?php

namespace App\DataFixtures;

use App\Entity\Nerd;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class NerdFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $admin = new Nerd();
        $admin->setUsername('supernerd');
        $admin->setEmail('supernerd@nerdyanswer.com');
        $admin->setPassword($this->encoder->encodePassword($admin, "pass_1234"));
        $admin->setRoles(['ROLE_SUPER_ADMIN']);
        $admin->setFullname("SuperNerd");
        $admin->setGender('C');
        $admin->setDob(new \DateTime('2000-01-01'));
        $admin->setIsVerified(true);
        $manager->persist($admin);

        $manager->flush();
    }
}
