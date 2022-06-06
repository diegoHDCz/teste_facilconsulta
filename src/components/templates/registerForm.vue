<template>
  <div
    class="containerModal d-flex justify-content-center d-flex align-items-center"
  >
    <Container class="content">
      <Title title="Sobre o profissional" subtitle="Dados do profissional" />
      <div class="row mt-3">
        <div class="col-md-6">
          <form @submit.prevent="handleSubmit()">
            <div class="largeInp">
              <label for="fullName">Nome Completo*</label>
              <input
                type="text"
                id="fullName"
                class="form-control form-control-sm"
                placeholder="Digite seu nome completo"
                @blur="NameValidate"
                v-model="form.fullName"
                required
              />
              <ErrorMessage
                :message="'Quantidade de Caracters inválido (mais que 3 e menos que 48)'"
                v-if="validation.name == true"
              />
            </div>
            <div class="shortInp">
              <label for="cpf">CPF*</label>
              <input
                type="text"
                id="cpf"
                class="form-control form-control-sm"
                placeholder="Digite seu CPF"
                v-model="form.CPF"
                @input="
                  form.CPF = form.CPF.replace(/[^0-9.]/g, '').replace(
                    /(\..*?)\..*/g,
                    '$1'
                  )
                "
                @blur="VerifyCPF"
                required
              />
              <ErrorMessage
                :message="'Este CPF já esta cadastrado'"
                v-if="validation.CPFexists == true"
              />
              <ErrorMessage
                :message="'Por favor insira um CPF válido'"
                v-if="validation.ValidCPF == true"
              />
              <label for="phone">Número de celular*</label>
              <input
                type="text"
                id="phone"
                class="form-control form-control-sm"
                placeholder="(00) 0 0000-0000"
                @blur="verifyPhone"
                v-model="form.phone"
                required
              />
              <ErrorMessage
                :message="'Preencher um celular válido com DDD'"
                v-if="validation.phone == true"
              />
            </div>

            <div class="selectStyles">
              <div class="stateContainer">
                <label for="state">Estdao*</label>
                <select
                  name="state"
                  id="state"
                  class="form-control form-control-sm"
                  v-model="form.stateId"
                  :change="getCities()"
                  required
                >
                  <option value="0" selected>Selecione</option>
                  <option
                    v-for="state in states"
                    :key="state.id"
                    :value="state.id"
                  >
                    {{ state.nome }}
                  </option>
                </select>
              </div>
              <div class="cityContainer">
                <label for="city">Cidade*</label>
                <select
                  name="city"
                  id="city"
                  class="form-control form-control-sm"
                  :disabled="form.stateId == 0"
                  required
                >
                  <option value="0" selected>Selecione</option>
                  <option
                    v-for="city in cities"
                    :key="city.id"
                    :value="city.id"
                  >
                    {{ city.nome }}
                  </option>
                </select>
              </div>
            </div>
            <div class="progressBar">
              <div class="content d-flex justify-content-between">
                <div class="bar">
                  <div class="inside"></div>
                  <p>1 de 2</p>
                </div>
              </div>
              <nextButton />
            </div>
          </form>
        </div>

        <div class="col-md-6">
          <DoctorImages name="register" image="doctor.png" />
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Container, Title } from "../bosons";
import { nextButton, DoctorImages } from "../atoms";
import StateInterfaceProps from "../../Interfaces/StateInterfaceProps";
import CityInterfaceProps from "../../Interfaces/CityInterfaceProps";
import { api } from "../../services/api";
import { ProfissionalsInterfaceProps } from "../../Interfaces/ProfissionalsInterfaceProps";
import ErrorMessage from "../atoms/errorMessage.vue";

export default defineComponent({
  components: { Container, Title, nextButton, DoctorImages, ErrorMessage },

  data() {
    return {
      states: {} as StateInterfaceProps[],
      cities: {} as CityInterfaceProps[],
      profissonals: {} as ProfissionalsInterfaceProps[],
      form: {
        stateId: 0 as number,
        fullName: "" as string,
        CPF: "" as string,
        phone: "" as string,
        city: "" as string,
      },
      validation: {
        name: false as boolean,
        ValidCPF: false as boolean,
        phone: false as boolean,
        CPFexists: false as boolean,
      },
    };
  },

  methods: {
    handleSubmit() {},

    getStates() {
      api
        .get("/estados")
        .then((response) => (this.states = response.data))
        .catch((error) => console.log(error));
    },

    getCities() {
      api
        .get("/cidades?estadoId=" + this.form.stateId)
        .then((response) => (this.cities = response.data))
        .catch((error) => console.log(error));

      // console.log(this.states.filter((element) => element.id == this.stateId));
    },
    getProfissionals() {
      api
        .get("/profissionais")
        .then((response) => (this.profissonals = response.data))
        .catch((error) => console.log(error));
    },
    NameValidate() {
      if (this.form.fullName.length >= 3 && this.form.fullName.length <= 48) {
        this.validation.name = false;
      } else {
        this.form.fullName = "";
        this.validation.name = true;
      }
    },
    VerifyCPF() {
      var ao_cpf = this.form.CPF;
      var cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
      if (cpfValido.test(ao_cpf) == true) {
        ao_cpf = ao_cpf.replace(/\D/g, ""); //Remove tudo o que não é dígito
      }
      for (let index = 0; index < this.profissonals.length; index++) {
        if (this.profissonals[index].cpf == ao_cpf) {
          this.validation.CPFexists = true;
        }
      }
      if (ao_cpf.length == 11) {
        ao_cpf = ao_cpf.replace(/(\d{3})(\d)/, "$1.$2");
        ao_cpf = ao_cpf.replace(/(\d{3})(\d)/, "$1.$2");
        ao_cpf = ao_cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        this.form.CPF = ao_cpf;
      } else {
        this.form.CPF = "";
        this.validation.ValidCPF = true;
      }
    },
    verifyPhone() {
      const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
      var str = this.form.phone.replace(/[^0-9]/g, "").slice(0, 11);
      console.log(str.length);
      const result = str.replace(regex, "($1) $2-$3");

      if (str.length == 11) {
        this.form.phone = result;
        this.validation.phone = false;
      } else {
        this.form.phone = "";
        this.validation.phone = true;
      }
    },
  },

  created() {
    this.getStates();
    this.getProfissionals();
  },
});
</script>

<style lang="scss">
.containerModal {
  height: 39rem;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }
  label {
    padding: 0;
    line-height: 0;
  }
  #cpf,
  #phone {
    width: 80%;
  }
  .form-control {
    border-radius: 5px !important;
  }
}
.selectStyles {
  display: flex;
  justify-content: space-between;
  select {
    width: 9rem;
  }
}
.progressBar {
  display: flex;
  flex-direction: column;

  .content {
    margin-top: 3rem;
    width: 100%;

    .bar {
      display: flex;

      .inside {
        width: 120px;
        height: 1.5rem;
        background: var(--blue-500);
      }
      p {
        margin-left: 9rem;
        color: var(--blue-500);
      }
    }
  }
}
</style>
