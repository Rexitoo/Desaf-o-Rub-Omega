'use client';

import { useEffect, useState } from 'react';

/* =========================================================
   CARTAS
========================================================= */

const ADMINS = ['Rexitoo', 'alex96', 'Redsam', 'Poke589', 'Faxzer0', 'ikerglz_'];
const ADMIN_HISTORY_USER = 'Rexitoo,Faxzer0';

const N = [
  // CURA Y APOYO
  {
    n: 'Objeto curativo',
    c: 'Cura',
    p: 1,
    d: 'Permite al jugador comprar un objeto curativo en la tienda(Abrir ticket).',
  },
  {
    n: 'Dama de la cura',
    c: 'Cura',
    p: 3,
    d: 'Puedes comprar hasta 5 objetos curativos por tramo (máximo 1 Dama de la Cura por tramo)-(Abrir ticket para comprobación).',
  },
  {
    n: 'Amor para dar',
    c: 'Cura',
    p: 1,
    d: 'Permite a otro jugador de tu elección comprar un objeto curativo(Abrir ticket).',
  },
  {
    n: 'Ayuda del coach',
    c: 'Cura',
    p: 2,
    d: 'Tu coach puede ayudarte durante 1 turno (máximo 2 min).',
  },
  {
    n: 'Tiro de ruleta',
    c: 'Cura',
    p: 5,
    d: 'El jugador puede lanzar la ruleta de su tramo y obtener sus recompensas.(Abrir ticket)',
  },

  // CAPTURAS
  {
    n: 'Skip Pokémon',
    c: 'Capturas',
    p: 5,
    d: 'Puedes saltarte hasta tres encuentros en una ruta (te quedas con el cuarto)-(Abrir ticket).',
  },
  {
    n: 'Recaptura',
    c: 'Capturas',
    p: 7,
    d: 'Puedes recapturar en una ruta (no Pokémon ya atrapados)-(Abrir ticket)',
  },
  {
    n: 'Reroll Salvaje',
    c: 'Capturas',
    p: 2,
    d: 'Usa este comodín cuando tu primer Pokémon de ruta no te convence. Este comodín te permite saltar ese Pokémon y tienes una nueva oportunidad de primer Pokémon de ruta.(Abrir ticket)',
  },

  // ELEGIDO
  {
    n: 'Revivir al elegido',
    c: 'Elegido',
    p: 7,
    d: 'Puedes revivir a tu Pokémon elegido. Tu Pokémon elegido puede revivir más de una vez(Abrir ticket para comprobación).',
  },
  {
    n: 'Totem del elegido',
    c: 'Elegido',
    p: 6,
    d: 'Recibes un objeto especial llamado Tótem. El objeto debe permanecer equipado en tu pokemon elegido para aplicar el siguiente efecto: Si la vida del pokemon llega a 0, dicha muerte no cuenta, al usar el efecto del totem debes tirarlo(Abrir ticket).'
  },
  {
    n: 'Prime',
    c: 'Elegido',
    p: 3,
    d: 'Si tu inicial estuvo durante todo el tramo en tu equipo y no murió ni una sola vez, este Pokémon recibirá 31 IVs en todas sus características. Si lo haces una segunda vez, tu Elegido se convertirá en shiny. Este comodín debe usarse al inicio del tramo(Abrir ticket).',
  },

  // ATAQUE
  {
    n: 'Robo de Objeto curativo',
    c: 'Ataque',
    p: 0,
    soloRuleta: true,
    tipoAtaque: 'Especial',
    d: 'Roba tres objetos curativos a un participante. Solo disponible en ruleta de tramo (Abrir ticket).',
  },
  {
    n: 'Desgaste',
    c: 'Ataque',
    p: 0,
    soloRuleta: true,
    tipoAtaque: 'Fuerte',
    d: 'Obliga a un jugador a no poder meter ni sacar nada de su equipo hasta que se le muera un Pokémon. Solo disponible en ruleta de tramo (Abrir ticket).',
  },
  {
    n: 'Elección Fatal',
    c: 'Ataque',
    p: 9,
    tipoAtaque: 'Fuerte',
    d: 'Escoge dos Pokémon del rival; este deberá liberar uno(Abrir ticket).',
  },
  {
    n: 'Liberar Pokémon',
    c: 'Ataque',
    p: 7,
    tipoAtaque: 'Fuerte',
    d: 'Otro jugador pierde un pokemon al azar de su equipo(Abrir ticket).',
  },
  {
    n: 'Toque de la Muerte',
    c: 'Ataque',
    p: 11,
    tipoAtaque: 'Fuerte',
    d: 'Escoge un Pokémon de otro jugador; este deberá liberarlo(Abrir ticket).',
  },
  {
    n: 'Robo de Pokémon',
    c: 'Ataque',
    p: 20,
    tipoAtaque: 'Fuerte',
    d: 'Roba el Pokémon que quieras de otro jugador(Abrir ticket).',
  },
  {
    n: 'Llamada del Team Rocket',
    c: 'Ataque',
    p: 9,
    tipoAtaque: 'Fuerte',
    d: 'Robas un Pokémon aleatorio a otro jugador(Abrir ticket).',
  },
  {
    n: 'Mismo Destino',
    c: 'Ataque',
    p: 7,
    tipoAtaque: 'Medio',
    d: 'Libera un Pokémon tuyo; otro jugador deberá liberar un Pokémon del mismo tipo-(Abrir ticket).',
  },
  {
    n: 'Bloqueo Pokémon',
    c: 'Ataque',
    p: 7,
    tipoAtaque: 'Medio',
    d: 'Escoge un pokemon de otro jugador que no podrá usar ese tramo.(El efecto termina en el jefe de tramo es decir, en ese combate podrá usarlo ya)-(Abrir ticket).',
  },
  {
    n: 'Destructor',
    c: 'Ataque',
    p: 0,
    soloRuleta: true,
    tipoAtaque: 'Fuerte',
    d: 'Obliga a un jugador a continuar con 5 pokemon el restodel tramo.(el efecto termina en el jefe de tramo, es decir en ese combate puedes usarlo ya). Solo disponible en ruleta de tramo (Abrir ticket)',
  },
  {
    n: 'Robo de Comodín',
    c: 'Ataque',
    p: 0,
    soloRuleta: true,
    tipoAtaque: 'Fuerte',
    d: 'Robas un comodín a elección de los que tiene en el inventario otro participante. Solo disponible en ruleta de tramo (Abrir ticket).',
  },

  // REVIVIR
  {
    n: 'Revivir Pokémon',
    c: 'Revivir',
    p: 10,
    d: 'Trae de vuelta a la vida a un Pokémon muerto escribiendo su nombre. Solo se puede usar una vez por Pokémon (Abrir ticket para comprobación).',
  },
  {
    n: 'Totem',
    c: 'Revivir',
    p: 8,
    d: 'Recibes un objeto especial llamado Tótem. El objeto debe permanecer equipado en un pokemon para aplicar el siguiente efecto: Si la vida del pokemon llega a 0, dicha muerte no cuenta, al usar el efecto del totem debes tirarlo.(Abrir ticket)'
  },
  {
    n: 'Mega Revivir',
    c: 'Revivir',
    p: 0,
    soloRuleta: true,
    d: 'Revive hasta 5 Pokémon (recuerda que un Pokémon solo puede revivir una vez). Solo disponible en ruleta de tramo (Abrir ticket para comprobación).',
  },
  {
    n: 'Bendición celestial',
    c: 'Revivir',
    p: 0,
    soloRuleta: true,
    d: 'Eres inmune al próximo combate. No mueren pokemon ni aumenta el contador de muertes.(este efecto es único, no hasta que logres pasar ese combate(Mencionar a un staff). Solo disponible en ruleta de tramo',
  },
  {
    n: 'Escudo protector',
    c: 'Revivir',
    p: 0,
    soloRuleta: true,
    d: 'Bloquea el próximo ataque recibido. Se activa si tu lo deseas y se mantiene hasta recibir un ataque o ser retirado por los administradores. Solo disponible en ruleta de tramo',
  },
  {
    n: 'Reversa',
    c: 'Revivir',
    p: 0,
    soloRuleta: true,
    d: 'Usa este comodín para activar tu escudo protector. Si te atacan, el ataque rebota, se devuelve al atacante y te quedas con su carta de ataque.',
  },

  // ECONOMÍA
  {
    n: 'Moneda',
    c: 'Economía',
    p: 0,
    soloRuleta: true,
    d: 'Recibes una moneda. Solo disponible en ruleta de tramo',
  },
  {
    n: '3 Monedas',
    c: 'Economía',
    p: 0,
    soloRuleta: true,
    d: 'Recibes 3 monedas. Solo disponible en ruleta de tramo',
  },
  {
    n: 'Robo de Monedas',
    c: 'Economía',
    p: 0,
    soloRuleta: true,
    tipoAtaque: 'Especial',
    d: 'Robas 5 monedas a otro participante. Solo disponible en ruleta de tramo',
  },
  {
    n: 'Venta Ilegal',
    c: 'Economía',
    p: 0,
    d: 'Selecciona un Pokémon y recibe 2 monedas. Ese Pokémon no podrá volver a ser objetivo de este comodín.',
    soloUso: true,
    infinito: true,
  },
  {
    n: 'Venta ilegal de lujo',
    c: 'Economía',
    p: 0,
    d: 'Selecciona un Pokémon y recibe 2 monedas. Ese Pokémon no podrá volver a ser objetivo de este comodín.',
    soloUso: true,
    infinito: true,
  },
  {
    n: 'Monedero perdido',
    c: 'Economía',
    p: 0,
    soloRuleta: true, 
    d: 'Recibes entre 1 y 5 monedas aleatoriamente. Solo disponible en ruleta de tramo',
  },
  {
    n: '5 monedas',
    c: 'Economía',
    p: 0,
    soloRuleta: true,
    d: 'Obtienes 5 monedas. Solo disponible en ruleta de tramo'
  },
  {
    n: '10 monedas',
    c: 'Economía',
    p: 0,
    soloRuleta: true,
    d: 'Obtienes 10 monedas. Solo disponible en ruleta de tramo'
  },

  // OBJETOS
  {
    n: 'Masterball',
    c: 'Objetos',
    p: 1,
    d: 'Obtienes una Masterball.(Abrir ticket)',
  },
  {
    n: 'Compra de MT',
    c: 'Objetos',
    p: 1,
    d: 'Permite comprar una MT de cualquiera de las tiendas disponibles.(Abrir ticket)',
  },
  {
    n: 'Capsula Habilidad',
    c: 'Objetos',
    p: 4,
    d: 'Cambia la habilidad de tu Pokémon por su habilidad secundaria.(Abrir ticket)',
  },
  {
    n: 'Piedra Evolutiva',
    c: 'Objetos',
    p: 3,
    d: 'Obtienes una piedra evolutiva a elección.(Abrir ticket)',
  },
  {
    n: 'Mega Piedra',
    c: 'Objetos',
    p: 5,
    d: 'Escoge una megapiedra a elección.(Abrir ticket)',
  },
  {
    n: 'Objeto Débil',
    c: 'Objetos',
    p: 2,
    d: 'Puedes obtener un objeto competitivo básico.(Abrir ticket)',
  },
  {
    n: 'Objeto Fuerte',
    c: 'Objetos',
    p: 3,
    d: 'Permite comprar un objeto competitivo poderoso.(Abrir ticket)',
  },
  {
    n: 'Permiso de Pokeballs',
    c: 'Objetos',
    p: 1,
    d: 'Usa este comodín para comprar hasta 15 pokeballs de la manera que desees en el centro comercial de Ciudad Calagua, Ciudad Malvalona...(Abrir ticket)',
  },

  // ESTADÍSTICAS Y MEJORAS
  {
    n: 'Naturaleza neutra',
    c: 'Estadísticas y mejoras',
    p: 0,
    soloRuleta: true,
    d: 'Cambia la naturaleza de un pokemon a neutra. Solo disponible en ruleta de tramo (Abrir ticket)',
  },

  // CONDICIONAL
  {
    n: 'Token Bancario',
    c: 'Condicional',
    p: 5,
    d: 'Consigues 15 monedas el siguiente tramo(Mantener durante el tramo de compra y al completar el tramo avisar a un staff)',
  },
  {
    n: 'Robo Justo',
    c: 'Condicional',
    p: 20, 
    tipoAtaque: 'Fuerte',
    d: 'Requiere tener al menos 3 de experiencia para comprarse. Al llegar a 4 de experiencia te llega uno gratis al buzón. Puedes robar un pokemon a otro participante(Abrir ticket)',
  },
  {
    n: 'Apuesta segura',
    c: 'Condicional',
    p: 5,
    d: 'Si ganas el combate de jefe de tramo(líder de gimnasio) con solo una baja o ninguna obtienes 10 monedas.(Abrir ticket)',
  },
];

const CARTAS = N.map((x, i) => ({
  id: String(i + 1),
  cat: x.c,
  nombre: x.n,
  precio: x.p,
  desc: x.d,
  soloRuleta: Boolean((x as any).soloRuleta),
  tipoAtaque: (x as any).tipoAtaque,
  soloUsoUnico: Boolean((x as any).soloUsoUnico),
}));

/* =========================================================
   PARTICIPANTES
========================================================= */

const PT_INICIAL = [
  'Tiosanto',
  'Rexitoo',
  'Redsam',
  'faxzer0',
  'alex96',
  '_Crema',
  'ikerglz_',
  'Poke589',
  'Yeibrami',
  'Faze_Pedro2009',
  'Pedro2707',
  'gogobaneado',
  'enriquepastor11',
  'imxteoxyz',
  'Pewpew',
  'Niyhu',
  'Minimuesli',
  'TheMaxis',
  'frannsann',
  'Ima',
  'Uligremh3',
  'Thiagoo',
  'SebasEmperor',
  'Demonn1',
].map((u, i) => ({
  usuario: u,
  contrasena: i === 0 ? 'tio123' : u.toLowerCase().replace('_', '') + '123',
  monedas: 20,
  compras: [],
  escudoActivo: false,
  reversaActiva: false,
  revivirUsados: [],
  ventaIlegalUsados: [],
  ventaIlegalLujoUsados: [],
  karma: 1,
  experiencia: 0,
  roboJustoCompradoTramo: false,
  equipo: [],
  buzon: [
    {
      id: 1,
      emisor: 'Admin (Rexitoo)',
      mensaje: '¡Bienvenido al Desafío Pokémon! Revisa las reglas en el inicio.',
      fecha: 'Hoy, 10:00',
      leido: false,
    },
    {
      id: 2,
      emisor: 'Sistema',
      mensaje: 'Se te han asignado 20 monedas iniciales y 1 punto de Karma.',
      fecha: 'Hoy, 10:01',
      leido: true,
    },
  ],
}));

/* =========================================================
   COMPONENTE
========================================================= */

export default function DesafioPokemonApp() {
  const [ps, setPs] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('desafio_pokemon_ps');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return PT_INICIAL;
        }
      }
    }
    return PT_INICIAL;
  });

  const [lg, setLg] = useState<any>(null);
  const [inputUser, setInputUser] = useState('');
  const [adminHistory, setAdminHistory] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('desafio_admin_history') || '[]');
    } catch {
      return [];
    }
  });

  const registrarHistorialAdmin = (accion: string) => {
    if (lg?.usuario !== ADMIN_HISTORY_USER) return;
    const entrada = {
      id: Date.now(),
      fecha: new Date().toLocaleString('es-ES'),
      usuario: lg.usuario,
      accion,
    };
    setAdminHistory((prev) => {
      const nuevo = [entrada, ...prev];
      localStorage.setItem('desafio_admin_history', JSON.stringify(nuevo));
      return nuevo;
    });
  };

  const [inputPass, setInputPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [seccionActual, setSeccionActual] = useState('INICIO');
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [cartaModal, setCartaModal] = useState<any>(null);
  const [ventaIlegalObjetivo, setVentaIlegalObjetivo] = useState('');
  const [revivirPokemonInput, setRevivirPokemonInput] = useState('');
  const [ataqueObjetivoUser, setAtaqueObjetivoUser] = useState('');
  const [comodinRobarSeleccionado, setComodinRobarSeleccionado] = useState('');
  const [notificacion, setNotificacion] = useState({
    texto: '',
    visible: false,
  });
  const [adminTargetUser, setAdminTargetUser] = useState(PT_INICIAL[0].usuario);
  const [adminAmount, setAdminAmount] = useState(10);
  const [adminCartaSel, setAdminCartaSel] = useState(CARTAS[0].nombre);
  const [adminMsgText, setAdminMsgText] = useState('');

  const isAdmin = ADMINS.map(a => a.toLowerCase()).includes(lg?.usuario?.toLowerCase() || '');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('desafio_pokemon_ps', JSON.stringify(ps));
    }
  }, [ps]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const usuario = inputUser.trim().toLowerCase();
    const encontrado = ps.find(
      (u) =>
        u.usuario.toLowerCase() === usuario && u.contrasena === inputPass
    );

    if (encontrado) {
      setLg(encontrado);
      setLoginError('');
      setInputPass('');
    } else {
      setLoginError('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setLg(null);
    setInputUser('');
    setInputPass('');
    setSeccionActual('INICIO');
  };

  const mostrarNotificacion = (msg: string) => {
    setNotificacion({ texto: msg, visible: true });
    setTimeout(() => {
      setNotificacion({ texto: '', visible: false });
    }, 4000);
  };

  const reiniciarTodo = () => {
    if (!isAdmin) return;
    const confirmar = window.confirm(
      '¿Estás seguro de que quieres reiniciar todo el desafío? Se borrarán los datos guardados y se restablecerá el sistema.'
    );
    if (!confirmar) return;

    localStorage.removeItem('desafio_pokemon_ps');
    localStorage.removeItem('desafio_admin_history');

    setPs(PT_INICIAL);
    setLg(PT_INICIAL.find((u) => u.usuario.toLowerCase() === lg?.usuario?.toLowerCase()) || PT_INICIAL[0]);
    setAdminHistory([]);
    
    mostrarNotificacion('🔄 ¡Se ha reiniciado todo el sistema con éxito!');
  };

  const adminReiniciarKarmaYExp = () => {
    if (!isAdmin) return;
    const confirmar = window.confirm(
      '¿Deseas restablecer el Karma a 1 y la Experiencia a 0 para todos los participantes?'
    );
    if (!confirmar) return;

    const actualizados = ps.map((x) => ({
      ...x,
      karma: 1,
      experiencia: 0,
      escudoActivo: false,
      reversaActiva: false,
      roboJustoCompradoTramo: false,
    }));

    setPs(actualizados);
    setLg(actualizados.find((x) => x.usuario === lg.usuario));
    mostrarNotificacion('⚡ ¡Karma y Experiencia restablecidos por el Admin!');
    registrarHistorialAdmin('Admin restableció Karma y EXP de todos los usuarios.');
  };

  const adminReiniciarEscudo = (usuarioObjetivo: string) => {
    if (!isAdmin) return;
    
    const objetivoUser = ps.find((x) => x.usuario.toLowerCase() === usuarioObjetivo.toLowerCase());
    if (!objetivoUser) {
      mostrarNotificacion('❌ Participante no encontrado.');
      return;
    }

    const actualizados = ps.map((x) => {
      if (x.usuario.toLowerCase() === objetivoUser.usuario.toLowerCase()) {
        return { ...x, escudoActivo: false, reversaActiva: false };
      }
      return x;
    });

    setPs(actualizados);
    if (lg.usuario === objetivoUser.usuario) {
      setLg(actualizados.find((x) => x.usuario === lg.usuario));
    }

    mostrarNotificacion(`🛡️ ¡Se ha retirado la protección activa de ${objetivoUser.usuario}!`);
    registrarHistorialAdmin(`Admin retiró la protección activa de ${objetivoUser.usuario}`);
  };

  const getPrecioRoboJusto = (user: any) => {
    if (!user) return 20;
    return 3;
  };

  const comprar = (carta: any) => {
    if (carta.infinito || carta.soloUso) {
      mostrarNotificacion('🔒 Este comodín no se puede comprar.');
      return;
    }

    if (carta.soloRuleta || (carta.cat === 'Economía' && carta.nombre !== 'Robo Justo')) {
      mostrarNotificacion('🎰 Solo disponible en la Ruleta de Tramo');
      return;
    }

    let precioFinal = carta.precio;
    if (carta.nombre === 'Robo Justo') {
      if (lg.experiencia < 3) {
        mostrarNotificacion('❌ Necesitas tener al menos 3 de experiencia para comprar Robo Justo.');
        return;
      }
      if (lg.roboJustoCompradoTramo) {
        mostrarNotificacion('❌ Ya has comprado o reclamado 1 Robo Justo.');
        return;
      }
      precioFinal = getPrecioRoboJusto(lg);
    }

    if (lg.monedas < precioFinal) {
      mostrarNotificacion('❌ No tienes suficientes monedas');
      return;
    }

    const actualizados = ps.map((x) => {
      if (x.usuario === lg.usuario) {
        return {
          ...x,
          monedas: x.monedas - precioFinal,
          compras: [...(x.compras || []), carta.nombre],
          roboJustoCompradoTramo: carta.nombre === 'Robo Justo' ? true : x.roboJustoCompradoTramo,
        };
      }
      return x;
    });

    setPs(actualizados);
    setLg(actualizados.find((x) => x.usuario === lg.usuario));
    mostrarNotificacion(`Comprado con Éxito\nHas comprado ${carta.nombre} x1 (Recuerda que debes darle a USAR para activarlo)`);
    registrarHistorialAdmin(`Compra: ${carta.nombre}`);
  };

  const CARTAS_MONEDAS: Record<string, number> = {
    '1 moneda': 1,
    '1 Moneda': 1,
    '3 monedas': 3,
    '3 Monedas': 3,
    '5 monedas': 5,
    '5 Monedas': 5,
    '10 monedas': 10,
    '10 Monedas': 10,
    'Moneda': 1,
  };

  const CARTAS_INFINITAS = new Set(['Venta Ilegal', 'Venta ilegal de lujo']);

  const usarCarta = (nombreCarta: string) => {
    const comprasActuales = lg.compras || [];
    const cartaDef = CARTAS.find((c) => c.nombre.toLowerCase() === nombreCarta.toLowerCase());

    if (CARTAS_INFINITAS.has(nombreCarta)) {
      const actualizados = ps.map((x) => {
        if (x.usuario === lg.usuario) {
          return { ...x, monedas: (x.monedas || 0) + 2 };
        }
        return x;
      });

      setPs(actualizados);
      setLg(actualizados.find((x) => x.usuario === lg.usuario));
      setVentaIlegalObjetivo('');
      setCartaModal(null);
      mostrarNotificacion(`💰 ${nombreCarta} usada. Has recibido 2 monedas.`);
      return;
    }

    if (nombreCarta.toLowerCase() === 'escudo protector') {
      const cartaEncontrada = comprasActuales.find(
        (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
      );
      if (!cartaEncontrada) {
        mostrarNotificacion('❌ No tienes esta carta en el inventario.');
        return;
      }
      if (lg.escudoActivo) {
        mostrarNotificacion('⚠️ Ya tienes un Escudo protector activo.');
        return;
      }

      const index = comprasActuales.findIndex(
        (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
      );
      const nuevasCompras = [...comprasActuales];
      nuevasCompras.splice(index, 1);

      const actualizados = ps.map((x) => {
        if (x.usuario === lg.usuario) {
          return { ...x, compras: nuevasCompras, escudoActivo: true };
        }
        return x;
      });

      setPs(actualizados);
      setLg(actualizados.find((x) => x.usuario === lg.usuario));
      setCartaModal(null);
      mostrarNotificacion('🛡️ ¡Escudo protector activado con éxito! Se mantendrá activo hasta recibir un ataque.');
      registrarHistorialAdmin(`Activación: ${lg.usuario} activó Escudo protector`);
      return;
    }

    if (nombreCarta.toLowerCase() === 'reversa') {
      const cartaEncontrada = comprasActuales.find(
        (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
      );
      if (!cartaEncontrada) {
        mostrarNotificacion('❌ No tienes esta carta en el inventario.');
        return;
      }
      if (lg.reversaActiva) {
        mostrarNotificacion('⚠️ Ya tienes la Reversa activa.');
        return;
      }

      const index = comprasActuales.findIndex(
        (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
      );
      const nuevasCompras = [...comprasActuales];
      nuevasCompras.splice(index, 1);

      const actualizados = ps.map((x) => {
        if (x.usuario === lg.usuario) {
          return { ...x, compras: nuevasCompras, reversaActiva: true };
        }
        return x;
      });

      setPs(actualizados);
      setLg(actualizados.find((x) => x.usuario === lg.usuario));
      setCartaModal(null);
      mostrarNotificacion('🔄 ¡Reversa activada con éxito! Al recibir un ataque, rebotará, te quedarás con la carta del atacante y este se quedará sin ella.');
      registrarHistorialAdmin(`Activación: ${lg.usuario} activó Reversa`);
      return;
    }

    if (nombreCarta.toLowerCase() === 'revivir pokémon') {
      const cartaEncontrada = comprasActuales.find(
        (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
      );
      if (!cartaEncontrada) {
        mostrarNotificacion('❌ No tienes esta carta en el inventario.');
        return;
      }
      const nombrePokemon = revivirPokemonInput.trim().toLowerCase();
      if (!nombrePokemon) {
        mostrarNotificacion('⚠️ Debes escribir el nombre del Pokémon que deseas revivir.');
        return;
      }

      const revivirUsadosActuales = lg.revivirUsados || [];
      if (revivirUsadosActuales.map((p: string) => p.toLowerCase()).includes(nombrePokemon)) {
        mostrarNotificacion(`❌ El Pokémon "${revivirPokemonInput.trim()}" ya ha utilizado su único revivir permitido.`);
        return;
      }

      const indexPropio = comprasActuales.findIndex(
        (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
      );
      const nuevasComprasPropias = [...comprasActuales];
      nuevasComprasPropias.splice(indexPropio, 1);

      const actualizados = ps.map((x) => {
        if (x.usuario === lg.usuario) {
          return {
            ...x,
            compras: nuevasComprasPropias,
            revivirUsados: [...revivirUsadosActuales, revivirPokemonInput.trim()],
          };
        }
        return x;
      });

      setPs(actualizados);
      setLg(actualizados.find((x) => x.usuario === lg.usuario));
      setRevivirPokemonInput('');
      setCartaModal(null);
      mostrarNotificacion(`✨ ¡Has revivido con éxito a tu Pokémon: ${revivirPokemonInput.trim()}!`);
      registrarHistorialAdmin(`Revivir Pokémon: ${lg.usuario} revivió a ${revivirPokemonInput.trim()}`);
      return;
    }

    if (nombreCarta.toLowerCase() === 'robo de comodín') {
      const cartaEncontrada = comprasActuales.find(
        (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
      );
      if (!cartaEncontrada) {
        mostrarNotificacion('❌ No tienes esta carta en el inventario.');
        return;
      }
      if (!ataqueObjetivoUser) {
        mostrarNotificacion('⚠️ Selecciona un participante objetivo.');
        return;
      }
      if (!comodinRobarSeleccionado) {
        mostrarNotificacion('⚠️ Selecciona el comodín que deseas robar del inventario del rival.');
        return;
      }

      const objetivoUser = ps.find(
        (x) => x.usuario.toLowerCase() === ataqueObjetivoUser.toLowerCase()
      );

      if (!objetivoUser) {
        mostrarNotificacion('❌ Participante no encontrado.');
        return;
      }

      const expPrevioDef = objetivoUser.experiencia || 0;
      const nuevaExpObjetivoBase = Math.min(4, expPrevioDef + 1);

      if (objetivoUser.reversaActiva) {
        const indexPropio = comprasActuales.findIndex(
          (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
        );
        const nuevasComprasPropias = [...comprasActuales];
        nuevasComprasPropias.splice(indexPropio, 1);

        const comprasDefensorActualizadas = [...(objetivoUser.compras || []), nombreCarta];

        let karmaAtacante = lg.karma;
        if (karmaAtacante > 0) karmaAtacante -= 1;

        const karmaObjetivo = (objetivoUser.karma || 0) + 1;

        let regaloRoboJusto = false;
        let comprasObjetivoFinal = [...comprasDefensorActualizadas];
        if (expPrevioDef < 4 && nuevaExpObjetivoBase === 4 && !objetivoUser.roboJustoCompradoTramo) {
          if (!comprasObjetivoFinal.includes('Robo Justo')) {
            comprasObjetivoFinal.push('Robo Justo');
            regaloRoboJusto = true;
          }
        }

        const actualizados = ps.map((x) => {
          if (x.usuario === lg.usuario) {
            return { ...x, karma: karmaAtacante, compras: nuevasComprasPropias };
          }
          if (x.usuario.toLowerCase() === objetivoUser.usuario.toLowerCase()) {
            return {
              ...x,
              karma: karmaObjetivo,
              experiencia: nuevaExpObjetivoBase,
              reversaActiva: false,
              compras: comprasObjetivoFinal,
              roboJustoCompradoTramo: regaloRoboJusto ? true : x.roboJustoCompradoTramo,
            };
          }
          return x;
        });

        setPs(actualizados);
        setLg(actualizados.find((x) => x.usuario === lg.usuario));
        setAtaqueObjetivoUser('');
        setComodinRobarSeleccionado('');
        setCartaModal(null);
        mostrarNotificacion(`🔄 ¡Reversa activada! El ataque rebotó: ${lg.usuario} pierde su carta "${nombreCarta}" y se la queda ${objetivoUser.usuario}. A ${objetivoUser.usuario} le sube 1 nivel de experiencia.`);
        registrarHistorialAdmin(`Reversa activada: ${nombreCarta} de ${lg.usuario} rebotó en ${objetivoUser.usuario}`);
        return;
      }

      if (objetivoUser.escudoActivo) {
        const indexPropio = comprasActuales.findIndex(
          (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
        );
        const nuevasComprasPropias = [...comprasActuales];
        nuevasComprasPropias.splice(indexPropio, 1);

        let karmaAtacante = lg.karma;
        if (karmaAtacante > 0) karmaAtacante -= 1;
        const karmaObjetivo = (objetivoUser.karma || 0) + 1;

        let regaloRoboJusto = false;
        let comprasObjetivoFinal = [...(objetivoUser.compras || [])];
        if (expPrevioDef < 4 && nuevaExpObjetivoBase === 4 && !objetivoUser.roboJustoCompradoTramo) {
          if (!comprasObjetivoFinal.includes('Robo Justo')) {
            comprasObjetivoFinal.push('Robo Justo');
            regaloRoboJusto = true;
          }
        }

        const actualizados = ps.map((x) => {
          if (x.usuario === lg.usuario) {
            return { ...x, karma: karmaAtacante, compras: nuevasComprasPropias };
          }
          if (x.usuario.toLowerCase() === objetivoUser.usuario.toLowerCase()) {
            return {
              ...x,
              karma: karmaObjetivo,
              experiencia: nuevaExpObjetivoBase,
              escudoActivo: false,
              compras: comprasObjetivoFinal,
              roboJustoCompradoTramo: regaloRoboJusto ? true : x.roboJustoCompradoTramo,
            };
          }
          return x;
        });

        setPs(actualizados);
        setLg(actualizados.find((x) => x.usuario === lg.usuario));
        setAtaqueObjetivoUser('');
        setComodinRobarSeleccionado('');
        setCartaModal(null);
        mostrarNotificacion(`🛡️ ¡Escudo protector bloqueó el ataque! El ataque fue neutralizado. A ${objetivoUser.usuario} le sube 1 nivel de experiencia.`);
        registrarHistorialAdmin(`Escudo protector activado por ${objetivoUser.usuario}`);
        return;
      }

      const comprasObjetivo = [...(objetivoUser.compras || [])];
      const indexComodinRival = comprasObjetivo.findIndex(
        (c: string) => c.toLowerCase() === comodinRobarSeleccionado.toLowerCase()
      );

      if (indexComodinRival === -1) {
        mostrarNotificacion('❌ El usuario objetivo ya no tiene ese comodín en su inventario.');
        return;
      }

      comprasObjetivo.splice(indexComodinRival, 1);

      const indexPropio = comprasActuales.findIndex(
        (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
      );
      const nuevasComprasPropias = [...comprasActuales];
      nuevasComprasPropias.splice(indexPropio, 1);
      nuevasComprasPropias.push(comodinRobarSeleccionado);

      let nuevoKarmaAtacante = lg.karma;
      if (lg.karma <= 0) {
        mostrarNotificacion('❌ No tienes suficientes puntos de Karma para realizar un ataque Fuerte (0 Karma).');
        return;
      }
      nuevoKarmaAtacante -= 1;

      const nuevoKarmaObjetivo = (objetivoUser.karma || 0) + 1;
      let regaloRoboJusto = false;
      if (expPrevioDef < 4 && nuevaExpObjetivoBase === 4 && !objetivoUser.roboJustoCompradoTramo) {
        if (!comprasObjetivo.includes('Robo Justo')) {
          comprasObjetivo.push('Robo Justo');
          regaloRoboJusto = true;
        }
      }

      const actualizados = ps.map((x) => {
        if (x.usuario === lg.usuario) {
          return {
            ...x,
            karma: nuevoKarmaAtacante,
            compras: nuevasComprasPropias,
          };
        }
        if (x.usuario.toLowerCase() === objetivoUser.usuario.toLowerCase()) {
          return {
            ...x,
            experiencia: nuevaExpObjetivoBase,
            karma: nuevoKarmaObjetivo,
            compras: comprasObjetivo,
            roboJustoCompradoTramo: regaloRoboJusto ? true : x.roboJustoCompradoTramo,
          };
        }
        return x;
      });

      setPs(actualizados);
      setLg(actualizados.find((x) => x.usuario === lg.usuario));
      setAtaqueObjetivoUser('');
      setComodinRobarSeleccionado('');
      setCartaModal(null);
      mostrarNotificacion(`🎴 ¡Has robado con éxito el comodín "${comodinRobarSeleccionado}" a ${objetivoUser.usuario}! Al defensor le sube 1 nivel de experiencia.`);
      registrarHistorialAdmin(`Robo de Comodín: ${lg.usuario} robó ${comodinRobarSeleccionado} a ${objetivoUser.usuario}`);
      return;
    }

    if (cartaDef?.cat === 'Ataque' || nombreCarta.toLowerCase() === 'robo de monedas') {
      const cartaEncontrada = comprasActuales.find(
        (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
      );

      if (!cartaEncontrada) {
        mostrarNotificacion('❌ No tienes esta carta en el inventario.');
        return;
      }

      if (!ataqueObjetivoUser) {
        mostrarNotificacion('⚠️ Selecciona un participante objetivo.');
        return;
      }

      if (ataqueObjetivoUser.toLowerCase() === lg.usuario.toLowerCase()) {
        mostrarNotificacion('❌ No puedes atacarte a ti mismo.');
        return;
      }

      const objetivoUser = ps.find(
        (x) => x.usuario.toLowerCase() === ataqueObjetivoUser.toLowerCase()
      );

      if (!objetivoUser) {
        mostrarNotificacion('❌ Participante no encontrado.');
        return;
      }

      if (objetivoUser.experiencia >= 4) {
        mostrarNotificacion(`❌ ${objetivoUser.usuario} ya tiene 4 puntos de Experiencia y ya no puede recibir efectos de Comodines de Ataque.`);
        return;
      }

      const tipo = cartaDef?.tipoAtaque || (nombreCarta.toLowerCase() === 'robo de monedas' ? 'Especial' : 'Fuerte');
      
      let nuevoKarmaAtacante = lg.karma;
      if (tipo === 'Fuerte') {
        if (lg.karma <= 0) {
          mostrarNotificacion('❌ No tienes puntos de Karma suficientes para realizar un ataque Fuerte (0 Karma).');
          return;
        }
        nuevoKarmaAtacante -= 1;
      }

      const index = comprasActuales.findIndex(
        (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
      );
      const nuevasCompras = [...comprasActuales];
      nuevasCompras.splice(index, 1);

      const expPrevioDef = objetivoUser.experiencia || 0;
      const nuevaExpObjetivoBase = Math.min(4, expPrevioDef + 1);

      if (objetivoUser.reversaActiva) {
        const comprasDefensorActualizadas = [...(objetivoUser.compras || []), nombreCarta];
        let karmaAtacanteTrasRebote = nuevoKarmaAtacante;
        if (tipo === 'Fuerte' && karmaAtacanteTrasRebote > 0) {
          karmaAtacanteTrasRebote -= 1; 
        }
        const karmaObjetivoTrasRebote = (objetivoUser.karma || 0) + 1;

        let regaloRoboJusto = false;
        let comprasObjetivoFinal = [...comprasDefensorActualizadas];
        if (expPrevioDef < 4 && nuevaExpObjetivoBase === 4 && !objetivoUser.roboJustoCompradoTramo) {
          if (!comprasObjetivoFinal.includes('Robo Justo')) {
            comprasObjetivoFinal.push('Robo Justo');
            regaloRoboJusto = true;
          }
        }

        const actualizados = ps.map((x) => {
          if (x.usuario === lg.usuario) {
            return {
              ...x,
              karma: karmaAtacanteTrasRebote,
              compras: nuevasCompras,
            };
          }
          if (x.usuario.toLowerCase() === objetivoUser.usuario.toLowerCase()) {
            return {
              ...x,
              karma: karmaObjetivoTrasRebote,
              experiencia: nuevaExpObjetivoBase,
              reversaActiva: false,
              compras: comprasObjetivoFinal,
              roboJustoCompradoTramo: regaloRoboJusto ? true : x.roboJustoCompradoTramo,
            };
          }
          return x;
        });

        setPs(actualizados);
        setLg(actualizados.find((x) => x.usuario === lg.usuario));
        setAtaqueObjetivoUser('');
        setCartaModal(null);
        mostrarNotificacion(`🔄 ¡Reversa activada! El ataque rebotó: pierdes tu carta "${nombreCarta}" y se la queda ${objetivoUser.usuario}. A ${objetivoUser.usuario} le sube 1 nivel de experiencia.`);
        registrarHistorialAdmin(`Reversa activada: ${nombreCarta} de ${lg.usuario} rebotó en ${objetivoUser.usuario}`);
        return;
      }

      if (objetivoUser.escudoActivo) {
        let karmaAtacanteTrasEscudo = nuevoKarmaAtacante;
        const karmaObjetivoTrasEscudo = (objetivoUser.karma || 0) + 1;

        let regaloRoboJusto = false;
        let comprasObjetivoFinal = [...(objetivoUser.compras || [])];
        if (expPrevioDef < 4 && nuevaExpObjetivoBase === 4 && !objetivoUser.roboJustoCompradoTramo) {
          if (!comprasObjetivoFinal.includes('Robo Justo')) {
            comprasObjetivoFinal.push('Robo Justo');
            regaloRoboJusto = true;
          }
        }

        const actualizados = ps.map((x) => {
          if (x.usuario === lg.usuario) {
            return {
              ...x,
              karma: karmaAtacanteTrasEscudo,
              compras: nuevasCompras,
            };
          }
          if (x.usuario.toLowerCase() === objetivoUser.usuario.toLowerCase()) {
            return {
              ...x,
              karma: karmaObjetivoTrasEscudo,
              experiencia: nuevaExpObjetivoBase,
              escudoActivo: false,
              compras: comprasObjetivoFinal,
              roboJustoCompradoTramo: regaloRoboJusto ? true : x.roboJustoCompradoTramo,
            };
          }
          return x;
        });

        setPs(actualizados);
        setLg(actualizados.find((x) => x.usuario === lg.usuario));
        setAtaqueObjetivoUser('');
        setCartaModal(null);
        mostrarNotificacion(`🛡️ ¡Escudo protector activado! El ataque fue bloqueado, pero a ${objetivoUser.usuario} le sube 1 nivel de experiencia.`);
        registrarHistorialAdmin(`Escudo protector bloqueó ataque de ${lg.usuario}`);
        return;
      }

      const nuevoKarmaObjetivo = (objetivoUser.karma || 0) + 1;
      let regaloRoboJusto = false;
      let comprasObjetivo = [...(objetivoUser.compras || [])];
      if (expPrevioDef < 4 && nuevaExpObjetivoBase === 4 && !objetivoUser.roboJustoCompradoTramo) {
        if (!comprasObjetivo.includes('Robo Justo')) {
          comprasObjetivo.push('Robo Justo');
          regaloRoboJusto = true;
        }
      }

      const actualizados = ps.map((x) => {
        if (x.usuario === lg.usuario) {
          return {
            ...x,
            karma: nuevoKarmaAtacante,
            compras: nuevasCompras,
          };
        }
        if (x.usuario.toLowerCase() === objetivoUser.usuario.toLowerCase()) {
          const sumarMonedasRobo = nombreCarta.toLowerCase() === 'robo de monedas';
          return {
            ...x,
            experiencia: nuevaExpObjetivoBase,
            karma: nuevoKarmaObjetivo,
            compras: comprasObjetivo,
            roboJustoCompradoTramo: regaloRoboJusto ? true : x.roboJustoCompradoTramo,
            monedas: sumarMonedasRobo ? Math.max(0, (x.monedas || 0) - 5) : x.monedas,
          };
        }
        return x;
      });

      let finalActualizados = actualizados;
      if (nombreCarta.toLowerCase() === 'robo de monedas') {
        finalActualizados = actualizados.map((x) => {
          if (x.usuario === lg.usuario) {
            return { ...x, monedas: (x.monedas || 0) + 5 };
          }
          return x;
        });
      }

      setPs(finalActualizados);
      setLg(finalActualizados.find((x) => x.usuario === lg.usuario));
      setAtaqueObjetivoUser('');
      setCartaModal(null);
      mostrarNotificacion(`⚔️ Ataque exitoso (${tipo}) contra ${objetivoUser.usuario}. A ${objetivoUser.usuario} le sube 1 nivel de experiencia.`);
      registrarHistorialAdmin(`Ataque (${tipo}): ${nombreCarta} de ${lg.usuario} a ${objetivoUser.usuario}`);
      return;
    }

    const nombreNormalizado = Object.keys(CARTAS_MONEDAS).find(
      (k) => k.toLowerCase() === nombreCarta.toLowerCase()
    );

    if (nombreNormalizado || Object.prototype.hasOwnProperty.call(CARTAS_MONEDAS, nombreCarta)) {
      const clave = nombreNormalizado || nombreCarta;
      const cantidad = CARTAS_MONEDAS[clave];
      
      const cartaEncontrada = comprasActuales.find(
        (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
      );

      if (!cartaEncontrada) {
        mostrarNotificacion('❌ No tienes esta carta en el inventario.');
        return;
      }

      const index = comprasActuales.findIndex(
        (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
      );
      const nuevasCompras = [...comprasActuales];
      nuevasCompras.splice(index, 1);

      const actualizados = ps.map((x) => {
        if (x.usuario === lg.usuario) {
          return {
            ...x,
            monedas: (x.monedas || 0) + cantidad,
            compras: nuevasCompras,
          };
        }
        return x;
      });

      setPs(actualizados);
      setLg(actualizados.find((x) => x.usuario === lg.usuario));
      setCartaModal(null);
      mostrarNotificacion(`🪙 Has recibido ${cantidad} moneda${cantidad === 1 ? '' : 's'}.`);
      return;
    }

    if (nombreCarta.toLowerCase() === 'monedero perdido') {
      const cartaEncontrada = comprasActuales.find(
        (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
      );

      if (!cartaEncontrada) {
        mostrarNotificacion('❌ No tienes esta carta en el inventario.');
        return;
      }

      const cantidad = Math.floor(Math.random() * 5) + 1;
      const index = comprasActuales.findIndex(
        (c: string) => c.toLowerCase() === nombreCarta.toLowerCase()
      );
      const nuevasCompras = [...comprasActuales];
      nuevasCompras.splice(index, 1);

      const actualizados = ps.map((x) => {
        if (x.usuario === lg.usuario) {
          return {
            ...x,
            monedas: (x.monedas || 0) + cantidad,
            compras: nuevasCompras,
          };
        }
        return x;
      });

      setPs(actualizados);
      setLg(actualizados.find((x) => x.usuario === lg.usuario));
      setCartaModal(null);
      mostrarNotificacion(`🪙 Monedero perdido: has encontrado ${cantidad} monedas.`);
      return;
    }

    const index = comprasActuales.indexOf(nombreCarta);
    if (index === -1) return;

    const nuevasCompras = [...comprasActuales];
    nuevasCompras.splice(index, 1);

    const actualizados = ps.map((x) => {
      if (x.usuario === lg.usuario) {
        return { ...x, compras: nuevasCompras };
      }
      return x;
    });

    setPs(actualizados);
    setLg(actualizados.find((x) => x.usuario === lg.usuario));
    mostrarNotificacion(`Has usado la carta ${nombreCarta}`);
    registrarHistorialAdmin(`Uso: ${nombreCarta}`);

    if (nuevasCompras.filter((c: string) => c === nombreCarta).length === 0) {
      setCartaModal(null);
    }
  };

  const marcarMensajeLeido = (msgId: number) => {
    const actualizados = ps.map((x) => {
      if (x.usuario === lg.usuario) {
        return {
          ...x,
          buzon: (x.buzon || []).map((m: any) =>
            m.id === msgId ? { ...m, leido: true } : m
          ),
        };
      }
      return x;
    });

    setPs(actualizados);
    setLg(actualizados.find((x) => x.usuario === lg.usuario));
  };

  const eliminarMensaje = (msgId: number) => {
    const actualizados = ps.map((x) => {
      if (x.usuario === lg.usuario) {
        return {
          ...x,
          buzon: (x.buzon || []).filter((m: any) => m.id !== msgId),
        };
      }
      return x;
    });

    setPs(actualizados);
    setLg(actualizados.find((x) => x.usuario === lg.usuario));
  };

  const adminModificarMonedas = (sumar: boolean) => {
    if (adminAmount <= 0) {
      mostrarNotificacion('⚠️ Introduce una cantidad válida');
      return;
    }

    const actualizados = ps.map((x) => {
      if (x.usuario === adminTargetUser) {
        const cambio = sumar ? adminAmount : -adminAmount;
        return { ...x, monedas: Math.max(0, x.monedas + cambio) };
      }
      return x;
    });

    setPs(actualizados);
    if (lg.usuario === adminTargetUser) {
      setLg(actualizados.find((x) => x.usuario === lg.usuario));
    }
    mostrarNotificacion(`Monedas actualizadas para ${adminTargetUser}`);
  };

  const adminOtorgarCarta = () => {
    const actualizados = ps.map((x) => {
      if (x.usuario === adminTargetUser) {
        return { ...x, compras: [...(x.compras || []), adminCartaSel] };
      }
      return x;
    });

    setPs(actualizados);
    if (lg.usuario === adminTargetUser) {
      setLg(actualizados.find((x) => x.usuario === lg.usuario));
    }
    mostrarNotificacion(`Carta "${adminCartaSel}" entregada a ${adminTargetUser} (Recuerda que debe darle a USAR para activarla)`);
  };

  const adminEnviarMensaje = () => {
    if (!adminMsgText.trim()) {
      mostrarNotificacion('⚠️ Escribe un mensaje primero');
      return;
    }

    const nuevoMsg = {
      id: Date.now(),
      emisor: 'Admin (' + lg.usuario + ')',
      mensaje: adminMsgText.trim(),
      fecha: 'Ahora',
      leido: false,
    };

    const actualizados = ps.map((x) => {
      if (x.usuario === adminTargetUser) {
        return { ...x, buzon: [nuevoMsg, ...(x.buzon || [])] };
      }
      return x;
    });

    setPs(actualizados);
    if (lg.usuario === adminTargetUser) {
      setLg(actualizados.find((x) => x.usuario === lg.usuario));
    }
    setAdminMsgText('');
    mostrarNotificacion(`Mensaje enviado a ${adminTargetUser}`);
  };

  const esNoComprable = (carta: any) =>
    Boolean(carta.soloRuleta) || (carta.cat === 'Economía' && carta.nombre !== 'Robo Justo');

  const cartasFiltradas = CARTAS.filter((c) => {
    const coincideFiltro =
      categoriaFiltro === 'Todas' || c.cat === categoriaFiltro;
    const coincideBusqueda = c.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase().trim());
    return coincideFiltro && coincideBusqueda;
  });

  const mensajesNoLeidos = (lg?.buzon || []).filter((m: any) => !m.leido).length;

  const getBadgeExperiencia = (exp: number) => {
    if (exp >= 4) return { icono: '🔴', nombre: 'Masterball' };
    if (exp >= 3) return { icono: '🟣', nombre: 'Ultraball' };
    if (exp >= 2) return { icono: '🔵', nombre: 'Superball' };
    if (exp >= 1) return { icono: '⚪', nombre: 'Pokeball' };
    return { icono: '💤', nombre: 'Sin EXP' };
  };

  const badgeInfo = getBadgeExperiencia(lg?.experiencia || 0);

  if (!lg) {
    return (
      <div className="flex h-screen w-screen bg-[#2a0028] items-center justify-center p-4 select-none font-sans">
        <form
          onSubmit={handleLogin}
          className="bg-[#111116] border border-slate-800 p-8 rounded-3xl w-full max-w-sm flex flex-col gap-5 shadow-2xl"
        >
          <div className="flex flex-col items-center gap-1">
            <div className="bg-yellow-400 text-black font-black italic px-4 py-1.5 rounded text-center text-sm tracking-tighter uppercase shadow-lg border border-yellow-300">
              DESAFÍO
              <span className="block text-xs tracking-widest text-red-600">
                POKÉMON
              </span>
            </div>
            <span className="text-slate-400 text-xs font-semibold mt-2">
              Iniciar Sesión
            </span>
          </div>

          {loginError && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 text-xs p-2.5 rounded-xl text-center font-bold">
              {loginError}
            </div>
          )}

          <div className="flex flex-col gap-3 text-xs">
            <div>
              <label className="text-slate-400 font-bold block mb-1">
                Usuario
              </label>
              <input
                type="text"
                value={inputUser}
                onChange={(e) => setInputUser(e.target.value)}
                placeholder="Ej. Tiosanto o Poke589"
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={inputPass}
                onChange={(e) => setInputPass(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-black text-xs rounded-xl shadow-lg uppercase tracking-wider transition mt-2"
          >
            Entrar
          </button>

          <div className="text-[10px] text-slate-500 text-center mt-2">
            Contraseña por defecto nuevos usuarios: [nombreusuario]123
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-[#2a0028] text-white font-sans overflow-hidden select-none">
      {/* SIDEBAR */}
      <aside className="w-56 bg-[#111116] flex flex-col justify-between p-4 border-r border-slate-800 shrink-0">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center pt-2">
            <div className="bg-yellow-400 text-black font-black italic px-3 py-1 rounded text-center text-xs tracking-tighter uppercase shadow-lg border border-yellow-300">
              DESAFÍO
              <span className="block text-[10px] tracking-widest text-red-600">
                POKÉMON
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-2 text-xs font-bold tracking-wider">
            {[
              { id: 'INICIO', label: 'INICIO', icon: '🏠' },
              { id: 'PARTICIPANTES', label: 'PARTICIPANTES', icon: '👥' },
              { id: 'COMBATES', label: 'COMBATES', icon: '⚔️' },
              { id: 'EVENTOS', label: 'EVENTOS', icon: '📅' },
              { id: 'CAJAS', label: 'CAJAS', icon: '📦' },
              { id: 'SHOWDOWN', label: 'SHOWDOWN', icon: '🎮' },
              { id: 'COMODINES', label: 'COMODINES', icon: '🎴' },
              { id: 'BUZÓN', label: 'BUZÓN', icon: '📬', badge: mensajesNoLeidos },
              { id: 'RULETAS', label: 'RULETAS', icon: '🎰' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSeccionActual(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                  seccionActual === item.id
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black shadow-md border-l-4 border-pink-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="bg-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-black">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}

            {isAdmin && (
              <button
                onClick={() => setSeccionActual('ADMIN')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  seccionActual === 'ADMIN'
                    ? 'bg-amber-500 text-black font-black shadow-md border-l-4 border-amber-300'
                    : 'text-amber-400 hover:bg-amber-950/40'
                }`}
              >
                <span>👑</span>
                <span>ADMIN</span>
              </button>
            )}
          </nav>
        </div>

        {/* PERFIL */}
        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-white">{lg.usuario}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-[10px] text-yellow-300 font-bold">
            🪙 {lg.monedas} monedas
          </div>
          <div className="text-[10px] text-purple-300 font-bold">
            ⚡ Karma: {lg.karma} | EXP: {lg.experiencia}
          </div>
          <button
            onClick={handleLogout}
            className="text-[10px] text-red-400 hover:text-red-300 font-bold text-left pt-1 border-t border-slate-800"
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 bg-gradient-to-br from-[#4a0043] via-[#240022] to-[#120015] p-6 overflow-y-auto flex flex-col items-center relative">
        <div className="absolute top-6 right-6 flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-2xl shadow-xl z-20 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-yellow-300" title="Puntos de Karma">
            <span>⚡</span> {lg.karma} Karma
          </div>
          <div className="h-4 w-[1px] bg-slate-700" />
          <div className="flex items-center gap-1.5 font-bold text-pink-400" title={`Nivel de Experiencia: ${badgeInfo.nombre}`}>
            <span>{badgeInfo.icono}</span> EXP: {lg.experiencia}
          </div>
          <div className="h-4 w-[1px] bg-slate-700" />
          <div 
            className={`flex items-center gap-1.5 font-black px-2.5 py-1 rounded-xl text-[11px] border ${
              lg.escudoActivo || lg.reversaActiva 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                : 'bg-slate-800/50 text-slate-400 border-slate-700'
            }`}
          >
            <span>🛡️</span>
            <span>{lg.reversaActiva ? 'REVERSA ACTIVA' : lg.escudoActivo ? 'ESCUDO ACTIVO' : 'SIN PROTECCIÓN'}</span>
          </div>
        </div>

        {lg.usuario === ADMIN_HISTORY_USER && (
          <section className="w-full max-w-5xl mb-6 bg-slate-900 border border-amber-500/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-black text-amber-400">📜 HISTORIAL ADMIN</h2>
              <button
                onClick={() => {
                  setAdminHistory([]);
                  localStorage.removeItem('desafio_admin_history');
                }}
                className="text-[10px] font-black px-3 py-2 rounded-lg bg-red-600 text-white"
              >
                BORRAR
              </button>
            </div>

            {adminHistory.length === 0 ? (
              <p className="text-xs text-slate-500">No hay acciones registradas.</p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {adminHistory.map((h) => (
                  <div key={h.id} className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                    <div className="text-[10px] text-slate-500">{h.fecha}</div>
                    <div className="text-xs text-white font-bold mt-1">{h.accion}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* INICIO */}
        {seccionActual === 'INICIO' && (
          <div className="w-full max-w-5xl flex flex-col gap-6">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-black text-white">¡Hola, {lg.usuario}! 👋</h1>
                <p className="text-xs text-pink-200">
                  Bienvenido al Panel Oficial del Desafío Pokémon.
                </p>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-yellow-500/30 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg">
                <span className="text-lg">🪙</span>
                <span className="text-sm font-black text-yellow-300">
                  {lg.monedas} Monedas
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
                <h2 className="text-base font-black text-pink-400 flex items-center gap-2 border-b border-slate-800 pb-3">
                  📢 Noticias y Anuncios
                </h2>
                <div className="flex flex-col gap-3">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-yellow-400">
                        🛡️ Reglas de Reversa y Experiencia
                      </span>
                      <span className="text-[10px] text-slate-500">Hoy</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Las cartas de Escudo Protector y Reversa no se activan al recibirlas; debes darles a "USAR" para mantenerlas activas. Al recibir cualquier ataque, la experiencia del defensor siempre sube 1 nivel (tenga escudo o reversa). Si usa la Reversa, el ataque rebota, el defensor se queda con la carta con la que le atacaron y el atacante se queda sin ella.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
                <h2 className="text-base font-black text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-3">
                  🎒 Tu Resumen
                </h2>
                <div className="flex flex-col gap-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Cartas:</span>
                    <span className="font-bold text-white">{(lg.compras || []).length}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Karma / EXP:</span>
                    <span className="font-bold text-yellow-300">{lg.karma} / {lg.experiencia}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Protección:</span>
                    <span className={`font-bold ${lg.escudoActivo || lg.reversaActiva ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {lg.reversaActiva ? 'Reversa' : lg.escudoActivo ? 'Escudo' : 'Inactiva'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PARTICIPANTES */}
        {seccionActual === 'PARTICIPANTES' && (
          <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-xl font-black text-pink-400 border-b border-slate-800 pb-3 mb-6 flex items-center gap-2">
              👥 Panel de Participantes (En Vivo)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs text-slate-400">
                    <th className="py-3 px-4 font-bold">Participante</th>
                    <th className="py-3 px-4 font-bold">🪙 Monedas</th>
                    <th className="py-3 px-4 font-bold">⚡ Karma / EXP</th>
                    <th className="py-3 px-4 font-bold">🎴 Comodines en Inventario</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs">
                  {ps.map((p) => {
                    const bInfo = getBadgeExperiencia(p.experiencia || 0);
                    const esAdminParticipante = ADMINS.map(a => a.toLowerCase()).includes(p.usuario.toLowerCase());
                    const esDuenoOCartaPublica = (cName: string) => {
                      const lower = cName.toLowerCase();
                      const esSensible = lower.includes('reversa') || lower.includes('escudo');
                      if (esSensible) {
                        return p.usuario.toLowerCase() === lg.usuario.toLowerCase() || isAdmin;
                      }
                      return true;
                    };

                    return (
                      <tr key={p.usuario} className="hover:bg-slate-950/50 transition">
                        <td className="py-4 px-4 font-black text-white flex items-center gap-2">
                          {p.usuario} 
                          {esAdminParticipante && <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-full border border-amber-500/30">👑 [Admin]</span>}
                          {p.usuario === lg.usuario && <span className="text-[10px] bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full">Tú</span>}
                          {isAdmin && p.reversaActiva && <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded-full">🔄 Reversa (Admin)</span>}
                          {isAdmin && p.escudoActivo && <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded-full">🛡️ Escudo (Admin)</span>}
                        </td>
                        <td className="py-4 px-4 font-bold text-yellow-300">
                          {p.monedas} 🪙
                        </td>
                        <td className="py-4 px-4 font-bold text-purple-300">
                          {p.karma} ⚡ | {bInfo.icono} {p.experiencia}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-2 items-center">
                            {p.compras && p.compras.length > 0 ? (
                              p.compras
                                .filter((cName: string) => {
                                  const cartaDef = CARTAS.find(
                                    (item) => item.nombre.toLowerCase() === cName.toLowerCase()
                                  );
                                  const esEconomia = cartaDef?.cat === 'Economía' && cartaDef?.nombre !== 'Robo Justo';

                                  if (esEconomia) {
                                    return p.usuario.toLowerCase() === lg.usuario.toLowerCase() || isAdmin;
                                  }
                                  return true;
                                })
                                .map((c: string, idx: number) => {
                                  const mostrarReal = esDuenoOCartaPublica(c);

                                  if (!mostrarReal) {
                                    return (
                                      <div
                                        key={idx}
                                        title="Oculto para proteger estrategia"
                                        className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-md text-[10px] text-slate-400 italic shadow-md"
                                      >
                                        🔒 Oculto
                                      </div>
                                    );
                                  }

                                  return (
                                    <div
                                      key={idx}
                                      title={c}
                                      className="w-10 h-14 bg-slate-950 border border-slate-700 rounded-md overflow-hidden flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                                    >
                                      <img
                                        src={`/${c.toLowerCase().replace(/ /g, '_')}.png`}
                                        alt={c}
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                          const target = e.currentTarget;
                                          target.style.display = 'none';
                                          if (target.parentElement) {
                                            target.parentElement.innerHTML = `<span class="text-[9px] text-center font-bold px-0.5 text-slate-300">${c}</span>`;
                                          }
                                        }}
                                      />
                                    </div>
                                  );
                                })
                            ) : (
                              <span className="text-slate-500 italic">Ninguno</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* COMODINES */}
        {seccionActual === 'COMODINES' && (
          <div className="w-full max-w-5xl bg-white text-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="bg-[#e6007e] text-white py-4 px-6 flex items-center justify-between shrink-0">
              <span className="font-black text-lg tracking-widest uppercase">
                🎴 Comodines
              </span>
              <div className="bg-black/30 px-3 py-1 rounded-full text-xs">
                🪙 {lg.monedas}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-slate-200 pb-4 shrink-0">
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="🔎 Buscar carta..."
                  className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
                <select
                  value={categoriaFiltro}
                  onChange={(e) => setCategoriaFiltro(e.target.value)}
                  className="bg-slate-100 border border-slate-300 text-xs font-bold py-2 px-3 rounded-xl"
                >
                  <option value="Todas">Todas</option>
                  <option value="Cura">Cura</option>
                  <option value="Capturas">Capturas</option>
                  <option value="Ataque">Ataque</option>
                  <option value="Elegido">El Elegido</option>
                  <option value="Revivir">Protección</option>
                  <option value="Objetos">Objetos</option>
                  <option value="Economía">Economía</option>
                  <option value="Estadísticas y mejoras">Estadísticas y mejoras</option>
                  <option value="Condicional">Condicional</option>
                </select>
              </div>

              <div className="overflow-y-auto flex-1 pr-2 mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-6">
                  {cartasFiltradas.map((carta) => (
                    <div
                      key={carta.id}
                      onClick={() => {
                        setCartaModal(carta);
                        setVentaIlegalObjetivo('');
                        setRevivirPokemonInput('');
                        setAtaqueObjetivoUser('');
                        setComodinRobarSeleccionado('');
                      }}
                      className="cursor-pointer group"
                    >
                      <div className="aspect-[3/4.2] bg-slate-100 rounded-xl border border-slate-300 shadow-md group-hover:shadow-xl group-hover:scale-105 transition flex items-center justify-center overflow-hidden">
                        <img
                          src={`/${carta.nombre.toLowerCase().replace(/ /g, '_')}.png`}
                          alt={carta.nombre}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            if (target.parentElement) {
                              target.parentElement.innerHTML = `
                                <div class="flex flex-col items-center justify-center text-center p-2">
                                  <span class="text-2xl mb-1">🎴</span>
                                  <span class="text-[9px] font-bold text-slate-700">${carta.nombre}</span>
                                </div>
                              `;
                            }
                          }}
                        />
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-[10px] font-bold text-slate-500">
                          {carta.nombre} {carta.tipoAtaque ? `(${carta.tipoAtaque})` : ''}
                        </span>
                      </div>
                    </div>
                  ))}
                  {cartasFiltradas.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-400 text-sm">
                      No se encontraron cartas.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BUZÓN */}
        {seccionActual === 'BUZÓN' && (
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-xl font-black text-pink-400 border-b border-slate-800 pb-3 mb-6">
              📬 Buzón de Entrada
            </h2>
            <div className="flex flex-col gap-3">
              {(lg.buzon || []).map((msg: any) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-2xl border flex flex-col md:flex-row justify-between gap-4 ${
                    msg.leido
                      ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                      : 'bg-slate-950 border-pink-500/40 text-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-black text-pink-400">{msg.emisor}</span>
                      <span className="text-[10px] text-slate-500">{msg.fecha}</span>
                      {!msg.leido && (
                        <span className="text-[9px] bg-pink-500 text-white font-black px-1.5 py-0.5 rounded-full">
                          NUEVO
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed">{msg.mensaje}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    {!msg.leido && (
                      <button
                        onClick={() => marcarMensajeLeido(msg.id)}
                        className="text-[10px] bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg"
                      >
                        ✓ Leído
                      </button>
                    )}
                    <button
                      onClick={() => eliminarMensaje(msg.id)}
                      className="text-[10px] bg-red-950/50 hover:bg-red-900 text-red-300 px-3 py-2 rounded-lg"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}
              {(lg.buzon || []).length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Tu buzón está vacío.
                </div>
              )}
            </div>
          </div>
        )}

        {/* RULETAS */}
        {seccionActual === 'RULETAS' && (
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 text-center">
            <div className="text-5xl">🎰</div>
            <div>
              <h2 className="text-2xl font-black text-pink-400 mb-2">Ruletas de Tramo</h2>
              <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                Las ruletas del desafío están gestionadas y en posesión de los administradores. Contacta con un miembro del staff para realizar tus tiradas de ruleta de tramo correspondientes.
              </p>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl max-w-md mx-auto w-full text-xs text-slate-400">
              👑 Administradores encargados: <span className="text-white font-bold">{ADMINS.join(', ')}</span>
            </div>
            <div>
              <button
                onClick={() => setSeccionActual('INICIO')}
                className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl text-xs font-black text-white"
              >
                ← VOLVER AL INICIO
              </button>
            </div>
          </div>
        )}

        {/* ADMIN */}
        {seccionActual === 'ADMIN' && isAdmin && (
          <div className="w-full max-w-5xl bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl flex flex-col gap-6">
            <h2 className="text-xl font-black text-amber-400 border-b border-slate-800 pb-3">
              👑 Panel de Control del Admin
            </h2>

            <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-purple-300">⚡ Restablecer Karma y Experiencia (Manual)</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Vuelve a poner a todos los jugadores en 1 de Karma y 0 de Experiencia (para limpiar bloqueos de ataques y restablecer contadores).
                </p>
              </div>
              <button
                onClick={adminReiniciarKarmaYExp}
                className="py-2.5 px-5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl shrink-0 shadow-lg transition"
              >
                🔄 RESTABLECER KARMA / EXP
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GESTOR DE MONEDAS */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col gap-4">
                <h3 className="text-sm font-bold">🪙 Gestor de Monedas</h3>
                <label className="text-xs text-slate-400">Jugador</label>
                <select
                  value={adminTargetUser}
                  onChange={(e) => setAdminTargetUser(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-white p-2 rounded-lg text-xs"
                >
                  {ps.map((u) => (
                    <option key={u.usuario} value={u.usuario}>
                      {u.usuario} — {u.monedas} 🪙
                    </option>
                  ))}
                </select>
                <label className="text-xs text-slate-400">Cantidad</label>
                <input
                  type="number"
                  min="1"
                  value={adminAmount}
                  onChange={(e) => setAdminAmount(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 text-white p-2 rounded-lg text-xs"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => adminModificarMonedas(true)}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 font-black text-xs rounded-lg"
                  >
                    + AÑADIR
                  </button>
                  <button
                    onClick={() => adminModificarMonedas(false)}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-500 font-black text-xs rounded-lg"
                  >
                    - QUITAR
                  </button>
                </div>
              </div>

              {/* ENTREGAR CARTA */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col gap-4">
                <h3 className="text-sm font-bold">🎁 Entregar Carta</h3>
                <label className="text-xs text-slate-400">Carta</label>
                <select
                  value={adminCartaSel}
                  onChange={(e) => setAdminCartaSel(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-white p-2 rounded-lg text-xs"
                >
                  {CARTAS.map((c) => (
                    <option key={c.id} value={c.nombre}>
                      {c.nombre} — {c.cat}
                    </option>
                  ))}
                </select>
                <button
                  onClick={adminOtorgarCarta}
                  className="mt-auto py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs rounded-lg"
                >
                  🎁 OTORGAR A {adminTargetUser}
                </button>
              </div>

              {/* REINICIAR PROTECCIÓN */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/30 flex flex-col gap-4">
                <h3 className="text-sm font-bold text-cyan-400">🛡️ Retirar Protección de Jugador</h3>
                <label className="text-xs text-slate-400">Seleccionar Participante</label>
                <select
                  value={adminTargetUser}
                  onChange={(e) => setAdminTargetUser(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-white p-2 rounded-lg text-xs"
                >
                  {ps.map((u) => (
                    <option key={u.usuario} value={u.usuario}>
                      {u.usuario} {u.reversaActiva ? '(🔄 Reversa Activa)' : u.escudoActivo ? '(🛡️ Escudo Activo)' : '(Sin Protección Activa)'}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => adminReiniciarEscudo(adminTargetUser)}
                  className="mt-auto py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs rounded-lg transition"
                >
                  🛡️ RETIRAR PROTECCIÓN A {adminTargetUser}
                </button>
              </div>

              <div className="md:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col gap-3">
                <h3 className="text-sm font-bold">📩 Enviar Mensaje</h3>
                <input
                  type="text"
                  value={adminMsgText}
                  onChange={(e) => setAdminMsgText(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="bg-slate-900 border border-slate-700 text-white p-3 rounded-xl text-xs"
                />
                <button
                  onClick={adminEnviarMensaje}
                  className="py-3 bg-pink-600 hover:bg-pink-500 font-black text-xs rounded-xl"
                >
                  📩 ENVIAR NOTIFICACIÓN
                </button>
              </div>

              <div className="md:col-span-2 bg-red-950/30 border border-red-500/30 p-5 rounded-2xl flex flex-col gap-3">
                <h3 className="text-sm font-bold text-red-400">⚠️ Zona de Peligro / Reinicio Total</h3>
                <p className="text-xs text-slate-400">
                  Esta acción restablecerá por completo las monedas, comodines y datos de todos los participantes a sus valores iniciales.
                </p>
                <button
                  onClick={reiniciarTodo}
                  className="py-3 bg-red-600 hover:bg-red-500 font-black text-xs text-white rounded-xl shadow-lg transition"
                >
                  🔄 REINICIAR TODO EL DESAFÍO
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECCIONES EN DESARROLLO */}
        {['COMBATES', 'EVENTOS', 'CAJAS', 'SHOWDOWN'].includes(seccionActual) && (
          <div className="w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-3xl p-12 text-center shadow-2xl">
            <div className="text-6xl mb-5">🚧</div>
            <h2 className="text-2xl font-black text-white mb-2">{seccionActual}</h2>
            <p className="text-sm text-slate-400">
              Esta sección está preparada para añadir las funciones del desafío.
            </p>
            <button
              onClick={() => setSeccionActual('INICIO')}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl text-xs font-black"
            >
              ← VOLVER AL INICIO
            </button>
          </div>
        )}

        {/* MODAL CARTA */}
        {cartaModal && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
            onClick={() => setCartaModal(null)}
          >
            <div
              className="bg-[#0e0c12] border border-slate-800 rounded-2xl max-w-2xl w-full p-8 shadow-2xl flex flex-col md:flex-row gap-8 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-52 aspect-[3/4.2] bg-slate-950 rounded-xl border border-slate-800 p-2 flex items-center justify-center overflow-hidden">
                <img
                  src={`/${cartaModal.nombre.toLowerCase().replace(/ /g, '_')}.png`}
                  alt={cartaModal.nombre}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="flex flex-col items-center justify-center text-center p-2">
                          <span class="text-3xl mb-1">🎴</span>
                          <span class="text-[10px] font-bold text-slate-300">${cartaModal.nombre}</span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              <div className="flex flex-col flex-1 gap-5 w-full">
                <div>
                  <span className="text-[10px] uppercase font-black text-pink-400">
                    {cartaModal.cat} {cartaModal.tipoAtaque ? `• Ataque ${cartaModal.tipoAtaque}` : ''}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">
                    {cartaModal.nombre}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-3">
                    {cartaModal.desc}
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500">INVENTARIO</span>
                  <div className="text-sm text-white font-bold mt-1">
                    Tienes {(lg.compras || []).filter((c: string) => c.toLowerCase() === cartaModal.nombre.toLowerCase()).length} unidad(es)
                  </div>
                </div>

                {cartaModal.nombre.toLowerCase() === 'revivir pokémon' && (
                  <div className="bg-slate-950 border border-pink-500/30 p-3 rounded-xl flex flex-col gap-3">
                    <label className="text-[10px] text-pink-400 font-black uppercase">
                      ✨ Escribe el nombre del Pokémon a revivir
                    </label>
                    <input
                      type="text"
                      value={revivirPokemonInput}
                      onChange={(e) => setRevivirPokemonInput(e.target.value)}
                      placeholder="Ej. Charizard..."
                      className="w-full bg-slate-900 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:border-pink-500"
                    />
                    <p className="text-[10px] text-yellow-300 font-bold">
                      ⚠️ Cada Pokémon solo puede ser revivido una vez.
                    </p>
                  </div>
                )}

                {cartaModal.nombre.toLowerCase() === 'robo de comodín' && (
                  <div className="bg-slate-950 border border-pink-500/30 p-3 rounded-xl flex flex-col gap-3">
                    <label className="text-[10px] text-pink-400 font-black uppercase">
                      ⚔️ Seleccionar Participante Objetivo y Comodín
                    </label>
                    <select
                      value={ataqueObjetivoUser}
                      onChange={(e) => {
                        setAtaqueObjetivoUser(e.target.value);
                        setComodinRobarSeleccionado('');
                      }}
                      className="w-full bg-slate-900 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:border-pink-500"
                    >
                      <option value="">-- Elige un jugador --</option>
                      {ps
                        .filter((p) => p.usuario.toLowerCase() !== lg.usuario.toLowerCase())
                        .map((p) => (
                          <option key={p.usuario} value={p.usuario}>
                            {p.usuario} (Comodines: {(p.compras || []).length})
                          </option>
                        ))}
                    </select>

                    {ataqueObjetivoUser && (
                      <select
                        value={comodinRobarSeleccionado}
                        onChange={(e) => setComodinRobarSeleccionado(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:border-pink-500"
                      >
                        <option value="">-- Elige el comodín a robar --</option>
                        {ps
                          .find((p) => p.usuario.toLowerCase() === ataqueObjetivoUser.toLowerCase())
                          ?.compras?.map((cName: string, idx: number) => (
                            <option key={idx} value={cName}>
                              {cName}
                            </option>
                          ))}
                      </select>
                    )}
                  </div>
                )}

                {(cartaModal.cat === 'Ataque' || cartaModal.nombre.toLowerCase() === 'robo de monedas') && cartaModal.nombre.toLowerCase() !== 'robo de comodín' && (
                  <div className="bg-slate-950 border border-pink-500/30 p-3 rounded-xl">
                    <label className="text-[10px] text-pink-400 font-black uppercase">
                      ⚔️ Seleccionar Participante Objetivo
                    </label>
                    <select
                      value={ataqueObjetivoUser}
                      onChange={(e) => setAtaqueObjetivoUser(e.target.value)}
                      className="mt-2 w-full bg-slate-900 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:border-pink-500"
                    >
                      <option value="">-- Elige un jugador --</option>
                      {ps
                        .filter((p) => p.usuario.toLowerCase() !== lg.usuario.toLowerCase())
                        .map((p) => (
                          <option key={p.usuario} value={p.usuario}>
                            {p.usuario} (EXP: {p.experiencia})
                          </option>
                        ))}
                    </select>
                    <p className="text-[10px] text-yellow-300 font-bold mt-2">
                      {cartaModal.tipoAtaque === 'Fuerte' ? '⚡ Este ataque consume 1 de Karma y al defensor le subirá 1 nivel de experiencia.' : '⚡ Este ataque afecta al rival y le subirá 1 nivel de experiencia.'}
                    </p>
                  </div>
                )}

                {(cartaModal.nombre === 'Venta Ilegal' || cartaModal.nombre === 'Venta ilegal de lujo') && (
                  <div className="bg-slate-950 border border-amber-500/30 p-3 rounded-xl">
                    <label className="text-[10px] text-amber-400 font-black uppercase">
                      🎯 Pokémon objetivo
                    </label>
                    <input
                      type="text"
                      value={ventaIlegalObjetivo}
                      onChange={(e) => setVentaIlegalObjetivo(e.target.value)}
                      placeholder="Escribe el Pokémon..."
                      className="mt-2 w-full bg-slate-900 border border-slate-700 text-white p-2.5 rounded-lg text-xs outline-none focus:border-amber-400"
                    />
                    <p className="text-[10px] text-emerald-400 font-bold mt-2">
                      💰 Al usar este comodín recibes 2 monedas.
                    </p>
                  </div>
                )}

                {!esNoComprable(cartaModal) && (
                  <div className="text-yellow-400 font-black">
                    🪙 {cartaModal.nombre === 'Robo Justo' ? getPrecioRoboJusto(lg) : cartaModal.precio}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => usarCarta(cartaModal.nombre)}
                    disabled={
                      !CARTAS_INFINITAS.has(cartaModal.nombre) &&
                      (lg.compras || []).filter((c: string) => c.toLowerCase() === cartaModal.nombre.toLowerCase()).length === 0
                    }
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black text-xs disabled:bg-slate-800 disabled:text-slate-600 disabled:opacity-50"
                  >
                    🎴 USAR
                  </button>

                  {!esNoComprable(cartaModal) && (
                    <button
                      onClick={() => comprar(cartaModal)}
                      className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-black text-xs rounded-xl"
                    >
                      🛒 COMPRAR
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    setCartaModal(null);
                    setVentaIlegalObjetivo('');
                    setRevivirPokemonInput('');
                    setAtaqueObjetivoUser('');
                    setComodinRobarSeleccionado('');
                  }}
                  className="text-xs text-slate-500 hover:text-white"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NOTIFICACIÓN */}
        {notificacion.visible && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center justify-between gap-8 border border-emerald-400 z-[100] min-w-[320px]">
            <div className="flex flex-col">
              <span className="text-xs font-black tracking-wide uppercase">
                {notificacion.texto.split('\n')[0]}
              </span>
              {notificacion.texto.includes('\n') && (
                <span className="text-[11px] font-medium opacity-90">
                  {notificacion.texto.split('\n')[1]}
                </span>
              )}
            </div>
            <button
              onClick={() => setNotificacion({ texto: '', visible: false })}
              className="text-xs font-bold bg-emerald-700/60 hover:bg-emerald-800 px-2.5 py-1 rounded uppercase"
            >
              CERRAR
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
