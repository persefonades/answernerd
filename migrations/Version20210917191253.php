<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210917191253 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE answer (id INT AUTO_INCREMENT NOT NULL, topic_id INT NOT NULL, question VARCHAR(255) NOT NULL, answer LONGTEXT NOT NULL, status VARBINARY(255) NOT NULL, posted DATETIME NOT NULL, edited DATETIME NOT NULL, INDEX IDX_DADD4A251F55203D (topic_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE answer_nerd (answer_id INT NOT NULL, nerd_id INT NOT NULL, INDEX IDX_BD5C0B12AA334807 (answer_id), INDEX IDX_BD5C0B12B08AB9F6 (nerd_id), PRIMARY KEY(answer_id, nerd_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE nerd (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, dob DATE NOT NULL, fullname VARCHAR(255) NOT NULL, gender VARCHAR(1) DEFAULT NULL, email VARCHAR(255) NOT NULL, is_verified TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_E377E8D2F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stub (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stub_answer (stub_id INT NOT NULL, answer_id INT NOT NULL, INDEX IDX_659DF378E942160A (stub_id), INDEX IDX_659DF378AA334807 (answer_id), PRIMARY KEY(stub_id, answer_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE topic (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, icon VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE answer ADD CONSTRAINT FK_DADD4A251F55203D FOREIGN KEY (topic_id) REFERENCES topic (id)');
        $this->addSql('ALTER TABLE answer_nerd ADD CONSTRAINT FK_BD5C0B12AA334807 FOREIGN KEY (answer_id) REFERENCES answer (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE answer_nerd ADD CONSTRAINT FK_BD5C0B12B08AB9F6 FOREIGN KEY (nerd_id) REFERENCES nerd (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE stub_answer ADD CONSTRAINT FK_659DF378E942160A FOREIGN KEY (stub_id) REFERENCES stub (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE stub_answer ADD CONSTRAINT FK_659DF378AA334807 FOREIGN KEY (answer_id) REFERENCES answer (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE answer_nerd DROP FOREIGN KEY FK_BD5C0B12AA334807');
        $this->addSql('ALTER TABLE stub_answer DROP FOREIGN KEY FK_659DF378AA334807');
        $this->addSql('ALTER TABLE answer_nerd DROP FOREIGN KEY FK_BD5C0B12B08AB9F6');
        $this->addSql('ALTER TABLE stub_answer DROP FOREIGN KEY FK_659DF378E942160A');
        $this->addSql('ALTER TABLE answer DROP FOREIGN KEY FK_DADD4A251F55203D');
        $this->addSql('DROP TABLE answer');
        $this->addSql('DROP TABLE answer_nerd');
        $this->addSql('DROP TABLE nerd');
        $this->addSql('DROP TABLE stub');
        $this->addSql('DROP TABLE stub_answer');
        $this->addSql('DROP TABLE topic');
    }
}
