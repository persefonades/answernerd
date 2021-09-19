<?php

namespace App\Entity;

use App\Repository\AnswerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AnswerRepository::class)
 */
class Answer
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $question;

    /**
     * @ORM\Column(type="text")
     */
    private $answer;

    /**
     * @ORM\ManyToMany(targetEntity=Nerd::class, inversedBy="answers")
     */
    private $author;

    /**
     * @ORM\Column(type="binary")
     */
    private $status;

    /**
     * @ORM\Column(type="datetime")
     */
    private $posted;

    /**
     * @ORM\Column(type="datetime")
     */
    private $edited;

    /**
     * @ORM\ManyToMany(targetEntity=Stub::class, mappedBy="answers")
     */
    private $stubs;

    /**
     * @ORM\ManyToOne(targetEntity=Topic::class, inversedBy="answers")
     * @ORM\JoinColumn(nullable=false)
     */
    private $topic;

    public function __construct()
    {
        $this->author = new ArrayCollection();
        $this->stubs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestion(): ?string
    {
        return $this->question;
    }

    public function setQuestion(string $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getAnswer(): ?string
    {
        return $this->answer;
    }

    public function setAnswer(string $answer): self
    {
        $this->answer = $answer;

        return $this;
    }

    /**
     * @return Collection|Nerd[]
     */
    public function getAuthor(): Collection
    {
        return $this->author;
    }

    public function addAuthor(Nerd $author): self
    {
        if (!$this->author->contains($author)) {
            $this->author[] = $author;
        }

        return $this;
    }

    public function removeAuthor(Nerd $author): self
    {
        $this->author->removeElement($author);

        return $this;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function setStatus($status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getPosted(): ?\DateTimeInterface
    {
        return $this->posted;
    }

    public function setPosted(\DateTimeInterface $posted): self
    {
        $this->posted = $posted;

        return $this;
    }

    public function getEdited(): ?\DateTimeInterface
    {
        return $this->edited;
    }

    public function setEdited(\DateTimeInterface $edited): self
    {
        $this->edited = $edited;

        return $this;
    }

    /**
     * @return Collection|Stub[]
     */
    public function getStubs(): Collection
    {
        return $this->stubs;
    }

    public function addStub(Stub $stub): self
    {
        if (!$this->stubs->contains($stub)) {
            $this->stubs[] = $stub;
            $stub->addAnswer($this);
        }

        return $this;
    }

    public function removeStub(Stub $stub): self
    {
        if ($this->stubs->removeElement($stub)) {
            $stub->removeAnswer($this);
        }

        return $this;
    }

    public function getTopic(): ?Topic
    {
        return $this->topic;
    }

    public function setTopic(?Topic $topic): self
    {
        $this->topic = $topic;

        return $this;
    }
}
