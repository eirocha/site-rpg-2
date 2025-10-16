'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { X, Star, Shield, Zap, Heart, Wrench, Skull, Crosshair } from 'lucide-react'

interface CharacterCardProps {
  character: {
    id: number
    name: string
    description: string
  }
  isOpen: boolean
  onClose: () => void
}

const characterData = {
  1: {
    name: "Sobrevivente Militar",
    title: "Estrategista do Apocalipse",
    description: "Estrategista experiente em combate tático. Um líder nato que mantém a disciplina mesmo quando o mundo desmorona.",
    image: "/characters/soldier.png",
    skills: ["Tática", "Combate", "Liderança", "Sobrevivência", "Armamentos"],
    attributes: {
      strength: 4,
      intelligence: 3,
      agility: 3,
      charisma: 3
    },
    equipment: ["Rifle de assalto", "Colete à prova de balas", "Rádio militar", "Kit de primeiros socorros"],
    backstory: "Veterano de guerras esquecidas, você viu o colapso vindo. Quando os mortos começaram a levantar, seu treinamento militar se tornou a diferença entre vida e morte. Agora você protege os que não podem se proteger.",
    roleplay: [
      "Você sempre avalia o terreno em busca de vantagens táticas",
      "Mantém disciplina e rotina mesmo no caos",
      "Protege os civis como se fossem sua própria família",
      "Acredita que ordem é a única esperança da humanidade"
    ]
  },
  2: {
    name: "Médico de Campo",
    title: "Anjo da Sobrevivência",
    description: "Conhece tratamentos improvisados e primeiros socorros. Um salvador que luta contra a morte em todas as suas formas.",
    image: "/characters/medic.png",
    skills: ["Medicina", "Primeiros Socorros", "Botânica", "Cirurgia", "Tratamentos"],
    attributes: {
      strength: 2,
      intelligence: 5,
      agility: 2,
      charisma: 3
    },
    equipment: ["Kit médico completo", "Antibióticos", "Instrumentos cirúrgicos", "Livro de medicina"],
    backstory: "Você estava no hospital quando os primeiros infectados chegaram. Viu colegas morrerem e pacientes se transformarem. Agora, com conhecimento médico limitado e recursos escassos, você é a última esperança para os feridos.",
    roleplay: [
      "Tenta salvar todos, mesmo quando parece impossível",
      "Conhece os estágios da infecção melhor que ninguém",
      "Mantém o humor profissional mesmo em situações extremas",
      "Carrega o peso de cada vida que não conseguiu salvar"
    ]
  },
  3: {
    name: "Ladrão de Suprimentos",
    title: "Fantasma Urbano",
    description: "Especialista em infiltração e obtenção de recursos. Um sobrevivente que move-se nas sombras para manter o grupo vivo.",
    image: "/characters/thief.png",
    skills: ["Furtividade", "Arrombamento", "Acrobacia", "Observação", "Escalada"],
    attributes: {
      strength: 2,
      intelligence: 3,
      agility: 5,
      charisma: 2
    },
    equipment: ["Ferramentas de arrombamento", "Corda de escalada", "Roupas escuras", "Mochila vazia"],
    backstory: "Antes do apocalipse, você vivia nas margens da sociedade. Agora, suas habilidades consideradas 'criminosas' são essenciais para a sobrevivência. Você entra onde ninguém mais pode e sai com o que mantém todos vivos.",
    roleplay: [
      "Move-se silenciosamente por instinto",
      "Avalia cada situação em busca de rotas de fuga",
      "Confia mais em suas habilidades do que nas pessoas",
      "Sabe que cada suprimento roubado salva vidas"
    ]
  },
  4: {
    name: "Mecânico Refugiado",
    title: "Mestre das Máquinas Mortas",
    description: "Conserta veículos e equipamentos com sucata. Um gênio da engenharia que dá nova vida ao ferro velho.",
    image: "/characters/mechanic.png",
    skills: ["Mecânica", "Eletrônica", "Soldagem", "Invenção", "Reparos"],
    attributes: {
      strength: 3,
      intelligence: 4,
      agility: 2,
      charisma: 2
    },
    equipment: ["Caixa de ferramentas", "Peças sobressalentes", "Gerador", "Combustível"],
    backstory: "Você era dono de uma oficina modesta quando o mundo acabou. Viu clientes se transformarem e carros serem abandonados. Agora, cada motor que você conserta é um passo rumo à sobrevivência, cada veículo restaurado é uma esperança de fuga.",
    roleplay: [
      "Fala com as máquinas como se fossem vivas",
      "Vê potencial em todo ferro velho",
      "Sabe que a tecnologia é a chave para a sobrevivência",
      "Prefere a companhia de motores à de pessoas"
    ]
  },
  5: {
    name: "Caçador de Infectados",
    title: "Purga Noturna",
    description: "Especialista em eliminação silenciosa e patrulha. Um predador que caça os mortos para proteger os vivos.",
    image: "/characters/hunter.png",
    skills: ["Combate Silencioso", "Rastreamento", "Camuflagem", "Paciência", "Armas Brancas"],
    attributes: {
      strength: 4,
      intelligence: 2,
      agility: 4,
      charisma: 1
    },
    equipment: ["Arma branca afiada", "Besta", "Roupas de camuflagem", "Isca de infectados"],
    backstory: "Você perdeu tudo para os infectados. Família, amigos, lar. A dor se transformou em fúria, e a fúria em propósito. Agora você caça os mortos com uma eficiência aterrorizante, tornando-se o monstro que outros monstros temem.",
    roleplay: [
      "Move-se como predador, sempre observando",
      "Conhece os padrões comportamentais dos infectados",
      "Raramente fala, prefere agir",
      "Encontra paz apenas quando os mortos caem"
    ]
  },
  6: {
    name: "Líder Comunitário",
    title: "Farol da Esperança",
    description: "Mantém a moral e organiza o grupo em crises. Um guia que mantém a humanidade viva mesmo quando tudo parece perdido.",
    image: "/characters/leader.png",
    skills: ["Liderança", "Diplomacia", "Organização", "Motivação", "Resolução de Conflitos"],
    attributes: {
      strength: 2,
      intelligence: 3,
      agility: 2,
      charisma: 5
    },
    equipment: ["Diário da comunidade", "Rádio de comunicação", "Mapas detalhados", "Símbolos de esperança"],
    backstory: "Você era professor, líder comunitário, ou simplesmente alguém que sempre se importou. Quando o apocalipse chegou, todos olharam para você. Agora você carrega o peso da esperança de muitos, mantendo a chama da humanidade acesa na escuridão.",
    roleplay: [
      "Sempre encontra palavras de esperança",
      "Conhece o nome e história de cada sobrevivente",
      "Toma decisões difíceis pelo bem do grupo",
      "Acredita que a cooperação é mais forte que o terror"
    ]
  }
}

export default function ZombieCharacterCard({ character, isOpen, onClose }: CharacterCardProps) {
  const fullCharacter = characterData[character.id as keyof typeof characterData]
  
  if (!fullCharacter) return null

  const AttributeBar = ({ value, icon: Icon, label }: { value: number; icon: any; label: string }) => (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-red-600" />
      <span className="text-sm font-medium w-20 text-gray-300">{label}</span>
      <div className="flex-1 bg-gray-600 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-bold text-red-400 w-4">{value}</span>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-800 to-red-900 border-2 border-red-800 mx-4 sm:mx-auto my-4 sm:my-auto">
        <DialogHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-300" />
          </button>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-red-100 pr-8 sm:pr-12 flex items-center gap-2">
            <Skull className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
            {fullCharacter.name}
          </DialogTitle>
          <DialogDescription className="text-red-300 font-medium text-sm sm:text-base">
            {fullCharacter.title}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4">
          {/* Imagem e Informações Básicas */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg border-2 border-red-800">
              <div className="w-full h-48 sm:h-64 lg:h-80 bg-gradient-to-br from-gray-700 to-red-800 flex items-center justify-center">
                <Skull className="w-24 h-24 sm:w-32 sm:h-32 text-red-300 opacity-50" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
                <h3 className="text-white font-bold text-base sm:text-lg">{fullCharacter.name}</h3>
              </div>
            </div>
            
            <Card className="border-red-700 bg-gray-700">
              <CardContent className="p-3 sm:p-4">
                <h4 className="font-bold text-red-100 mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <Star className="w-4 h-4" />
                  Descrição
                </h4>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {fullCharacter.description}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Atributos e Habilidades */}
          <div className="space-y-4">
            <Card className="border-red-700 bg-gray-700">
              <CardContent className="p-3 sm:p-4">
                <h4 className="font-bold text-red-100 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <Shield className="w-4 h-4" />
                  Atributos
                </h4>
                <div className="space-y-2 sm:space-y-3">
                  <AttributeBar value={fullCharacter.attributes.strength} icon={Zap} label="Força" />
                  <AttributeBar value={fullCharacter.attributes.intelligence} icon={Star} label="Inteligência" />
                  <AttributeBar value={fullCharacter.attributes.agility} icon={Zap} label="Agilidade" />
                  <AttributeBar value={fullCharacter.attributes.charisma} icon={Heart} label="Carisma" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-red-700 bg-gray-700">
              <CardContent className="p-3 sm:p-4">
                <h4 className="font-bold text-red-100 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <Wrench className="w-4 h-4" />
                  Habilidades
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {fullCharacter.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-red-900 text-red-100 border-red-600 text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator className="my-4 sm:my-6 bg-red-600" />
        
        {/* História e Roleplay */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="border-red-700 bg-gray-700">
            <CardContent className="p-3 sm:p-4">
              <h4 className="font-bold text-red-100 mb-2 sm:mb-3 text-sm sm:text-base">História</h4>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {fullCharacter.backstory}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-red-700 bg-gray-700">
            <CardContent className="p-3 sm:p-4">
              <h4 className="font-bold text-red-100 mb-2 sm:mb-3 text-sm sm:text-base">Dicas de Roleplay</h4>
              <ul className="space-y-1 sm:space-y-2">
                {fullCharacter.roleplay.map((tip, index) => (
                  <li key={index} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 sm:mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Equipamento */}
        <Card className="border-red-700 bg-gray-700">
          <CardContent className="p-3 sm:p-4">
            <h4 className="font-bold text-red-100 mb-2 sm:mb-3 text-sm sm:text-base">Equipamento Inicial</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {fullCharacter.equipment.map((item, index) => (
                <div key={index} className="bg-gray-600 rounded-lg p-2 sm:p-3 text-center">
                  <p className="text-xs sm:text-sm font-medium text-red-100">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}