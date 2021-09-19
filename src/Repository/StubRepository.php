<?php

namespace App\Repository;

use App\Entity\Stub;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Stub|null find($id, $lockMode = null, $lockVersion = null)
 * @method Stub|null findOneBy(array $criteria, array $orderBy = null)
 * @method Stub[]    findAll()
 * @method Stub[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StubRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Stub::class);
    }

    // /**
    //  * @return Stub[] Returns an array of Stub objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Stub
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
