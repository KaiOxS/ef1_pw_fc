<template>
  <div>
    <div class="puntajes">
      <h3>Puntaje: {{ puntaje }}</h3>
      <h3>Intento: {{ intentos }}</h3>
    </div>

    <div
      v-if="!intentosValidador() && puntaje < 10"
      class="mensaje-perdedor"
      style="color: red"
    >
      <h2>Has utilizado tus 5 intentos</h2>
      <br />
      <h2>El juego ha terminado, intentalo nuevamente</h2>
    </div>

    <div v-if="puntaje >= 10" class="mensaje-ganador" style="color: blue">
      <h2>Puntaje: {{ puntaje }}</h2>
      <br />
      <h2>Felicidades has ganado un premio de $10.000,00</h2>
    </div>

    <div class="componentes">
      <ComponenteHijo
        v-if="intentosValidador()"
        :imagenUrl="imagen1.url"
        :texto="imagen1.texto"
      />
      <ComponenteHijo
        v-if="intentosValidador()"
        :imagenUrl="imagen2.url"
        :texto="imagen2.texto"
      />
      <ComponenteHijo
        v-if="intentosValidador()"
        :imagenUrl="imagen3.url"
        :texto="imagen3.texto"
      />
    </div>

    <div class="botones">
      <button v-if="intentosValidador()" v-on:click="jugar()">JUGAR</button>
      <button v-if="!intentosValidador()" v-on:click="nuevoJuego()">
        NUEVO JUEGO
      </button>
    </div>
  </div>
</template>

<script>
import ComponenteHijo from "./ComponenteHijo.vue";
import { consumirAPIFacade } from "@/clients/PokemonClient.js";

export default {
  components: {
    ComponenteHijo,
  },
  data() {
    return {
      puntaje: 0,
      intentos: 0,
      imagen1: {
        url: "https://dummyimage.com/250x250",
        texto: "XXXXXXXXX",
      },
      imagen2: {
        url: "https://dummyimage.com/250x250",
        texto: "XXXXXXXXX",
      },
      imagen3: {
        url: "https://dummyimage.com/250x250",
        texto: "XXXXXXXXX",
      },
    };
  },
  methods: {
    async jugar() {
      this.intentos++;
      const res1 = await consumirAPIFacade();
      const res2 = await consumirAPIFacade();
      const res3 = await consumirAPIFacade();

      this.imagen1 = { url: res1.url, texto: res1.nombre };
      this.imagen2 = { url: res2.url, texto: res2.nombre };
      this.imagen3 = { url: res3.url, texto: res3.nombre };

      if (
        res1.url === res2.url &&
        res1.url === res3.url &&
        res2.url === res3.url
      ) {
        this.puntaje += 5;
      } else if (
        res1.url === res2.url ||
        res1.url === res3.url ||
        res2.url === res3.url
      ) {
        this.puntaje += 2;
      }
    },
    intentosValidador() {
      if (this.intentos < 5) {
        return true;
      }
    },
    nuevoJuego() {
      this.intentos = 0;
      this.puntaje = 0;
      this.imagen1 = {
        url: "https://dummyimage.com/250x250",
        texto: "XXXXXXXXX",
      };
      this.imagen2 = {
        url: "https://dummyimage.com/250x250",
        texto: "XXXXXXXXX",
      };
      this.imagen3 = {
        url: "https://dummyimage.com/250x250",
        texto: "XXXXXXXXX",
      };
    },
  },
};
</script>

<style>
.puntajes,
.componentes {
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 50px;
  margin-top: 50px;
}
.textos {
  display: flex;
  gap: 170px;
  text-align: center;
  justify-content: center;
}
.botones {
  display: flex;
  justify-content: center;
  margin-top: 70px;
}
button {
  border: solid black 5px;
  height: 50px;
  width: 150px;
  font-weight: bold;
}
button:active {
  background-color: red;
}
.mensaje-perdedor,
.mensaje-ganador {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}
</style>