'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { X, Star, Shield, Zap, Heart, Wrench, Rocket, Globe, Brain } from 'lucide-react'

interface CharacterCardProps {
  character: {
    id: number
    name: string
    description: string
    image?: string
  }
  isOpen: boolean
  onClose: () => void
}

const characterData = {
  1: {
    name: "Capitão Explorador",
    title: "Comandante das Estrelas",
    description: "Líder nato com experiência em missões perigosas. Um estrategista espacial que guia tripulações através dos desafios mais extremos do cosmos.",
    image: "/characters/captain.png",
    skills: ["Liderança", "Navegação Estelar", "Tática Espacial", "Diplomacia", "Comando"],
    attributes: {
      strength: 4,
      intelligence: 3,
      agility: 3,
      charisma: 4
    },
    equipment: ["Comunicador quântico", "Uniforme de comando", "Pistola de plasma", "Mapa estelar holográfico"],
    backstory: "Nascido em colônia espacial, você cresceu ouvindo histórias de exploração e descoberta. Desde jovem, sonhava em comandar sua própria nave e explorar os confins do universo. Agora, como capitão experiente, você lidera missões que outros consideram impossíveis.",
    roleplay: [
      "Você sempre avalia os riscos antes de tomar decisões",
      "Mantém a calma mesmo nas situações mais críticas",
      "Protege sua tripulação como se fossem sua família",
      "Acredita que a exploração é o futuro da humanidade"
    ]
  },
  2: {
    name: "Cientista Espacial",
    title: "Pesquisador do Infinito",
    description: "Especialista em fenômenos cósmicos e vida alienígena. Uma mente brilhante que decifra os mistérios do universo.",
    image: "/characters/scientist.png",
    skills: ["Física Quântica", "Xenobiologia", "Análise de Dados", "Pesquisa", "Tecnologia Avançada"],
    attributes: {
      strength: 2,
      intelligence: 5,
      agility: 2,
      charisma: 3
    },
    equipment: ["Scanner multi-espectral", "Laboratório portátil", "Computador quântico", "Amostras alienígenas"],
    backstory: "Gênio precoce da Academia Espacial, você sempre foi fascinado pelos mistérios do cosmos. Suas pesquisas sobre fenômenos anômalos revolucionaram a compreensão humana sobre o universo. Agora, você busca respostas para as maiores perguntas da existência.",
    roleplay: [
      "Analisa tudo com base em dados e evidências",
      "Fala em termos técnicos complexos sem perceber",
      "Fica excitado com descobertas científicas",
      "Acredita que o conhecimento é a maior força"
    ]
  },
  3: {
    name: "Engenheiro de Nave",
    title: "Mestre das Máquinas Estelares",
    description: "Mantém sistemas críticos funcionando em condições extremas. Um gênio da mecânica espacial que pode consertar qualquer coisa.",
    image: "/characters/engineer.png",
    skills: ["Mecânica Espacial", "Sistemas de Propulsão", "Eletrônica Avançada", "Manutenção", "Inovação"],
    attributes: {
      strength: 3,
      intelligence: 4,
      agility: 2,
      charisma: 2
    },
    equipment: ["Ferramentas multi-uso", "Soldadora de plasma", "Diagnóstico computadorizado", "Peças sobressalentes"],
    backstory: "Criado em oficinas espaciais, você aprendeu desde cedo a conversar com máquinas. Sua intuição mecânica é lendária - você pode diagnosticar problemas apenas pelo som dos motores. Para você, cada nave é um ser vivo que precisa de cuidado.",
    roleplay: [
      "Conversa com as máquinas como se fossem pessoas",
      "Confia mais na intuição do que em manuais",
      "Sempre carrega ferramentas improvisadas",
      "Sabe que cada parafuso tem sua importância"
    ]
  },
  4: {
    name: "Piloto Estelar",
    title: "Ás do Cosmos",
    description: "Manobra com precisão em asteroides e nebulosas. Um piloto excepcional que dança com as estrelas.",
    image: "/characters/pilot.png",
    skills: ["Pilotagem Avançada", "Combate Espacial", "Navegação em Campo de Asteroides", "Reflexos", "Acrobacia Espacial"],
    attributes: {
      strength: 3,
      intelligence: 2,
      agility: 5,
      charisma: 3
    },
    equipment: ["Capacete de pilotagem", "Controles personalizáveis", "Traje anti-G", "Sistema de mira avançado"],
    backstory: "Órfão de guerra espacial, você cresceu pilotando naves de contrabando. Seus reflexos sobre-humanos e coragem suicida o tornaram lenda nos portos espaciais. Agora, você usa suas habilidades para missões que exigem precisão cirúrgica.",
    roleplay: [
      "Move-se com graça mesmo em gravidade zero",
      "Conhece cada manobra evasiva possível",
      "Fala com a nave como se fosse uma extensão seu corpo",
      "Entra em estado de fluxo durante combates"
    ]
  },
  5: {
    name: "Médico de Bordo",
    title: "Curador das Estrelas",
    description: "Especialista em medicina espacial e emergências. Um salvador que luta contra doenças desconhecidas e ferimentos gravitacionais.",
    image: "/characters/medic.png",
    skills: ["Medicina Espacial", "Cirurgia Robótica", "Farmacologia Avançada", "Triagem", "Tratamento de Emergência"],
    attributes: {
      strength: 2,
      intelligence: 4,
      agility: 3,
      charisma: 4
    },
    equipment: ["Kit médico avançado", "Scanner biológico", "Drogas experimentais", "Robô cirúrgico"],
    backstory: "Médico de emergência em colônias distantes, você viu doenças que nenhum livro descreve. Sua experiência com condições médicas extremas o tornou especialista em tratamentos inovadores. Você acredita que cada vida vale qualquer risco.",
    roleplay: [
      "Avalia riscos médicos constantemente",
      "Mantém o humor profissional em crises",
      "Conhece os limites do corpo humano",
      "Carrega o peso de cada paciente perdido"
    ]
  },
  6: {
    name: "Explorador Planetário",
    title: "Pioneiro de Mundos Novos",
    description: "Especialista em sobrevivência e descoberta de novos mundos. Um aventureiro que pisou onde nenhum humano jamais esteve.",
    image: "/characters/explorer.png",
    skills: ["Sobrevivência Extrema", "Geologia Planetária", "Rastreamento", "Botânica Alienígena", "Navegação Terrestre"],
    attributes: {
      strength: 4,
      intelligence: 3,
      agility: 4,
      charisma: 2
    },
    equipment: ["Traje ambiental", "Ferramentas de exploração", "Amostrador geológico", "Comunicador de longo alcance"],
    backstory: "Criado em planeta de fronteira, você aprendeu a sobreviver em ambientes hostis desde criança. Sua curiosidade o levou a explorar mundos proibidos e descobrir espécies desconhecidas. Para você, cada planeta é um novo desafio e cada descoberta é motivo para continuar.",
    roleplay: [
      "Avalia cada ambiente como potencial perigo",
      "Move-se silenciosamente por instinto de sobrevivência",
      "Coleta amostras de tudo que encontra",
      "Sabe que o universo guarda segredos incríveis"
    ]
  }
}

export default function SpaceCharacterCard({ character, isOpen, onClose }: CharacterCardProps) {
  const fullCharacter = characterData[character.id as keyof typeof characterData]
  
  if (!fullCharacter) return null

  const AttributeBar = ({ value, icon: Icon, label }: { value: number; icon: any; label: string }) => (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-blue-600" />
      <span className="text-sm font-medium w-20 text-gray-300">{label}</span>
      <div className="flex-1 bg-gray-600 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-bold text-blue-400 w-4">{value}</span>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800 to-blue-900 border-2 border-blue-800 mx-4 sm:mx-auto my-4 sm:my-auto">
        <DialogHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
          </button>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-blue-100 pr-8 sm:pr-12 flex items-center gap-2">
            <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            {fullCharacter.name}
          </DialogTitle>
          <DialogDescription className="text-blue-300 font-medium text-sm sm:text-base">
            {fullCharacter.title}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4">
          {/* Imagem e Informações Básicas */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg border-2 border-blue-800">
              <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-slate-700 to-blue-800 flex items-center justify-center">
                {character.image ? (
                  <img 
                    src={character.image} 
                    alt={fullCharacter.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Rocket className="w-24 h-24 sm:w-32 sm:h-32 text-blue-300 opacity-50" />
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
                <h3 className="text-white font-bold text-base sm:text-lg">{fullCharacter.name}</h3>
              </div>
            </div>
            
            <Card className="border-blue-700 bg-slate-700">
              <CardContent className="p-3 sm:p-4">
                <h4 className="font-bold text-blue-100 mb-2 flex items-center gap-2 text-sm sm:text-base">
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
            <Card className="border-blue-700 bg-slate-700">
              <CardContent className="p-3 sm:p-4">
                <h4 className="font-bold text-blue-100 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <Shield className="w-4 h-4" />
                  Atributos
                </h4>
                <div className="space-y-2 sm:space-y-3">
                  <AttributeBar value={fullCharacter.attributes.strength} icon={Zap} label="Força" />
                  <AttributeBar value={fullCharacter.attributes.intelligence} icon={Brain} label="Inteligência" />
                  <AttributeBar value={fullCharacter.attributes.agility} icon={Zap} label="Agilidade" />
                  <AttributeBar value={fullCharacter.attributes.charisma} icon={Heart} label="Carisma" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-700 bg-slate-700">
              <CardContent className="p-3 sm:p-4">
                <h4 className="font-bold text-blue-100 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <Wrench className="w-4 h-4" />
                  Habilidades
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {fullCharacter.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-900 text-blue-100 border-blue-600 text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator className="my-4 sm:my-6 bg-blue-600" />
        
        {/* História e Roleplay */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="border-blue-700 bg-slate-700">
            <CardContent className="p-3 sm:p-4">
              <h4 className="font-bold text-blue-100 mb-2 sm:mb-3 text-sm sm:text-base">História</h4>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {fullCharacter.backstory}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-700 bg-slate-700">
            <CardContent className="p-3 sm:p-4">
              <h4 className="font-bold text-blue-100 mb-2 sm:mb-3 text-sm sm:text-base">Dicas de Roleplay</h4>
              <ul className="space-y-1 sm:space-y-2">
                {fullCharacter.roleplay.map((tip, index) => (
                  <li key={index} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5 sm:mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Equipamento */}
        <Card className="border-blue-700 bg-slate-700">
          <CardContent className="p-3 sm:p-4">
            <h4 className="font-bold text-blue-100 mb-2 sm:mb-3 text-sm sm:text-base">Equipamento Padrão</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {fullCharacter.equipment.map((item, index) => (
                <div key={index} className="bg-slate-600 rounded-lg p-2 sm:p-3 text-center">
                  <p className="text-xs sm:text-sm font-medium text-blue-100">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}