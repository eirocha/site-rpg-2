'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { X, Star, Shield, Zap, Heart, Wrench } from 'lucide-react'

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
    name: "Engenheiro de Campo",
    title: "Mestre da Mecânica Improvisada",
    description: "Conserta máquinas com sucata e intuição. Um gênio prático que transforma ferro velho em soluções milagrosas.",
    image: "/characters/engineer.png",
    skills: ["Mecânica", "Improvisação", "Soldagem", "Desmontagem", "Reparo Emergencial"],
    attributes: {
      strength: 3,
      intelligence: 4,
      agility: 2,
      charisma: 2
    },
    equipment: ["Chave de fenda multi-uso", "Ferramentas de sucata", "Óleos e graxas", "Peças sobressalentes"],
    backstory: "Criado nas oficinas sujas do distrito industrial, você aprendeu desde cedo que toda máquina tem uma alma e que nem sempre o manual é a melhor guia. Suas mãos calçadas sempre encontram a peça certa no momento certo.",
    roleplay: [
      "Você confia mais na intuição mecânica do que em manuais técnicos",
      "Sempre carrega ferramentas improvisadas nos bolsos",
      "Fala em metáforas de engrenagens e vapor",
      "Acredita que toda máquina merece uma segunda chance"
    ]
  },
  2: {
    name: "Agente da Coroa",
    title: "Sombra da Monarquia",
    description: "Usa gadgets e disfarces para se infiltrar. Um mestre do espionagem vitoriano, leal à coroa mas com moral própria.",
    image: "/characters/agent.png",
    skills: ["Disfarce", "Infiltração", "Gadgets", "Sedução", "Inteligência Social"],
    attributes: {
      strength: 2,
      intelligence: 3,
      agility: 4,
      charisma: 4
    },
    equipment: ["Relógio-pistola", "Lentes de visão noturna", "Disfarces múltiplos", "Fio de arame"],
    backstory: "Recrutado dos salões aristocráticos, você foi treinado nas artes sombrias do espionagem. Sua lealdade à coroa é inquestionável, mas você sabe que às vezes a justiça requer métodos não convencionais.",
    roleplay: [
      "Muda de sotaque e postura conforme a situação",
      "Sempre observa os detalhes que outros ignoram",
      "Usa roupas elegantes mesmo em missões perigosas",
      "Tem contatos em todas as camadas da sociedade"
    ]
  },
  3: {
    name: "Mago Tecnológico",
    title: "Arquitecto do Arcano-Mecânico",
    description: "Encanta artefatos com runas e circuitos. Um pioneiro na fusão entre magia antiga e tecnologia moderna.",
    image: "/characters/mage.png",
    skills: ["Runas Antigas", "Circuitos Mágicos", "Encantamento", "Teoria Arcana", "Programação Mística"],
    attributes: {
      strength: 1,
      intelligence: 5,
      agility: 2,
      charisma: 3
    },
    equipment: ["Cajado de circuitos", "Livro de runas", "Frasco de mana", "Lentes de detecção mágica"],
    backstory: "Você foi um dos primeiros a descobrir que as runas antigas podem ser programadas como circuitos. Rejeitado pelos magos tradicionais e pelos engenheiros céticos, você encontrou seu lugar entre as maravilhas impossíveis da tecnologia mágica.",
    roleplay: [
      "Fala em equações mágicas e teoremas arcanos",
      "Vê o mundo como um grande circuito mágico",
      "Sempre está experimentando com novas combinações",
      "Acredita que magia e tecnologia são duas faces da mesma moeda"
    ]
  },
  4: {
    name: "Piloto de Dirigível",
    title: "Ás dos Céus a Vapor",
    description: "Manobra com ousadia e precisão nos céus. Um rebelde dos ares que conhece cada corrente de vento e nuvem de gás.",
    image: "/characters/pilot.png",
    skills: ["Pilotagem", "Navegação Aérea", "Combate Aéreo", "Meteorologia", "Manutenção de Dirigíveis"],
    attributes: {
      strength: 3,
      intelligence: 2,
      agility: 4,
      charisma: 3
    },
    equipment: ["Óculos de voo", "Jaqueta de couro", "Bússola aérea", "Mapas de correntes"],
    backstory: "Nascido em uma família de construtores de dirigíveis, você desde criança sonhava em pilotar as naves que seu pai construía. Hoje, você é conhecido nos portos aéreos como o único piloto capaz de navegar pela tempestade de gás do distrito industrial.",
    roleplay: [
      "Sempre olha para o céu, mesmo em terra",
      "Conhece todos os portos aéreos e seus segredos",
      "Tem histórias sobre cada tempestade que enfrentou",
      "Trata seu dirigível como se fosse um ser vivo"
    ]
  },
  5: {
    name: "Investigador Alquímico",
    title: "Detetive das Soluções Químicas",
    description: "Analisa pistas com compostos e lógica. Um cientista forense que resolve crimes usando o poder da alquimia.",
    image: "/characters/investigator.png",
    skills: ["Análise Química", "Lógica Dedutiva", "Alquimia Forense", "Observação", "Metodologia Científica"],
    attributes: {
      strength: 2,
      intelligence: 5,
      agility: 2,
      charisma: 2
    },
    equipment: ["Kit de análise portátil", "Lupa de aumento", "Frascos de reagentes", "Diário de evidências"],
    backstory: "Ex-professor da Academia Real de Ciências, você foi expulso por suas teorias 'radicais' sobre aplicar alquimia na investigação criminal. Hoje, a polícia secremente contrata seus serviços quando os métodos tradicionais falham.",
    roleplay: [
      "Sempre coleta amostras e evidências",
      "Fala em termos químicos e científicos",
      "É metódico e paciente em suas investigações",
      "Acredita que toda pergunta tem uma resposta química"
    ]
  },
  6: {
    name: "Forja-da-alma",
    title: "Artesão dos Metais Conscientes",
    description: "Cria itens com metais imbuídos de alma. Um ferreiro místico que dá vida aos objetos através de antigas técnicas.",
    image: "/characters/forger.png",
    skills: ["Forja Mística", "Encantamento de Metais", "Ritual de Alma", "Metalurgia Arcana", "Criação de Artefatos"],
    attributes: {
      strength: 4,
      intelligence: 3,
      agility: 2,
      charisma: 3
    },
    equipment: ["Martelo de alma", "Bigá místico", "Metais raros", "Cristais de poder"],
    backstory: "Aprendiz do último Mestre Forja-da-alma, você herdou técnicas antigas que permitem aprisionar fragmentos de alma nos metais. Cada objeto que você cria tem uma personalidade própria e uma história para contar.",
    roleplay: [
      "Conversa com as ferramentas e os metais",
      "Sente as 'emocões' dos objetos que cria",
      "Acredita que tudo merece uma alma",
      "Tem respeito profundo por todos os materiais"
    ]
  }
}

export default function CharacterCard({ character, isOpen, onClose }: CharacterCardProps) {
  const fullCharacter = characterData[character.id as keyof typeof characterData]
  
  if (!fullCharacter) return null

  const AttributeBar = ({ value, icon: Icon, label }: { value: number; icon: any; label: string }) => (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-amber-600" />
      <span className="text-sm font-medium w-20">{label}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-bold text-amber-700 w-4">{value}</span>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-800 mx-4 sm:mx-auto my-4 sm:my-auto">
        <DialogHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-amber-900 pr-8 sm:pr-12">
            {fullCharacter.name}
          </DialogTitle>
          <DialogDescription className="text-amber-700 font-medium text-sm sm:text-base">
            {fullCharacter.title}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4">
          {/* Imagem e Informações Básicas */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg border-2 border-amber-800">
              <img
                src={fullCharacter.image}
                alt={fullCharacter.name}
                className="w-full h-48 sm:h-64 lg:h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
                <h3 className="text-white font-bold text-base sm:text-lg">{fullCharacter.name}</h3>
              </div>
            </div>
            
            <Card className="border-amber-700">
              <CardContent className="p-3 sm:p-4">
                <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <Star className="w-4 h-4" />
                  Descrição
                </h4>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  {fullCharacter.description}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Atributos e Habilidades */}
          <div className="space-y-4">
            <Card className="border-amber-700">
              <CardContent className="p-3 sm:p-4">
                <h4 className="font-bold text-amber-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
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
            
            <Card className="border-amber-700">
              <CardContent className="p-3 sm:p-4">
                <h4 className="font-bold text-amber-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <Wrench className="w-4 h-4" />
                  Habilidades
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {fullCharacter.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-800 border-amber-300 text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator className="my-4 sm:my-6" />
        
        {/* História e Roleplay */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="border-amber-700">
            <CardContent className="p-3 sm:p-4">
              <h4 className="font-bold text-amber-900 mb-2 sm:mb-3 text-sm sm:text-base">História</h4>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                {fullCharacter.backstory}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-amber-700">
            <CardContent className="p-3 sm:p-4">
              <h4 className="font-bold text-amber-900 mb-2 sm:mb-3 text-sm sm:text-base">Dicas de Roleplay</h4>
              <ul className="space-y-1 sm:space-y-2">
                {fullCharacter.roleplay.map((tip, index) => (
                  <li key={index} className="text-xs sm:text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5 sm:mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Equipamento */}
        <Card className="border-amber-700">
          <CardContent className="p-3 sm:p-4">
            <h4 className="font-bold text-amber-900 mb-2 sm:mb-3 text-sm sm:text-base">Equipamento Inicial</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {fullCharacter.equipment.map((item, index) => (
                <div key={index} className="bg-amber-100 rounded-lg p-2 sm:p-3 text-center">
                  <p className="text-xs sm:text-sm font-medium text-amber-900">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}