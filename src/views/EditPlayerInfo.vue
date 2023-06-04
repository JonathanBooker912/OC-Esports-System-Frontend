<script setup>
import { reactive, ref, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers, integer } from "@vuelidate/validators";
import Utils from "../config/utils";

/* Form Components  */
import EmergencyContact from "../components/FormComponents/EmergencyContact.vue";
import MonthYearPicker from "../components/FormComponents/MonthYearPicker.vue";
import TextField from "../components/FormComponents/TextField.vue";
import ComboBox from "../components/FormComponents/ComboBox.vue";
import YesNoRadio from "../components/FormComponents/YesNoRadio.vue";

/* API Services */
import TitleServices from "../services/titleServices";
import UserServices from "../services/userServices";

const titles = ref(); //Store the games (titles) retrieved from the database
const userInfoLoaded = ref(false); // used to prevent the components from loading before data is ready

// storage for the basic user info
const userInfo = ref({
  fName: "",
  lName: "",
  email: "",
  phoneNumber: "",
  city: "",
  state: "",
  country: "",
  shirtSize: "",
  pantSize: "",
  outsidePC: "",
  fullVacc: "",
  classification: "",
  expectedGradDate: "",
  agreementSigned: "",
  title: "",
  gamerTag: "",
  role: "",
});

// an array of objects to store emergency contact info
const emergencyContacts = ref([]);

// validation rules for each piece of data
const rules = reactive({
  fName: { required },
  lName: { required },
  email: { required },
  phoneNumber: { required },
  city: { required },
  state: { required },
  country: { required },
  shirtSize: { required },
  pantSize: { required },
  outsidePC: { required },
  fullVacc: { required },
  classification: { required },
  expectedGradDate: { required },
  agreementSigned: {},
  title: { required },
  gamerTag: { required },
});

const v$ = useVuelidate(rules, userInfo); // setup the vuelidate object

// validate the contents of the form before submitting
const validateForm = async () => {
  const valid = await v$.value.$validate(); // check all fields for invalid input
  console.log(userInfo.value);
  if (valid) {
    // if no errors, proceed with form submission
    updateInfo();
  } else {
    return;
  }
};

const sizes = ref(["S", "M", "L", "XL", "XXL", "XXXL"]); // shirt and pant sizes (may migrate to backend)
const classifications = ref(); // Storage for the enumerated types for year classifications

// add an object to the emergency contact array
function addContact(contactInfo) {
  let contact = {
    fName: "",
    lName: "",
    emailAddress: "",
    relationship: "",
  };
  if (contactInfo != null) {
    contact = { ...contactInfo };
    console.log(contact);
  }
  emergencyContacts.value.push(contact);
}

// remove a specific object from the emergency contact array
function removeContact(contact) {
  emergencyContacts.value = emergencyContacts.value.filter(
    (current) => current != contact
  );
}

// send the form data to the backend to update the user's info
function updateInfo() {
  let userId = Utils.getStore("user").userId;
  UserServices.updateUser(userId, userInfo.value).then((response) => {
    console.log(response);
  });

  /*
  for (let i = 0; i < emergencyContacts.value.length; i++) {
    UserServices.addEmergencyContact(emergencyContacts.value[i]).then(
      (response) => {
        console.log(response);
      }
    );
  }*/

  /* Get the id associated with the primary alias (if any),
      and update it accordingly */
  UserServices.getPrimaryAlias(userId).then((response) => {
    if (response.data.length == 0) {
      UserServices.addAlias(userId, {
        title: userInfo.value.title,
        gamerTag: userInfo.value.gamerTag,
      }).then((response) => {
        console.log(response);
      });
    } else {
      console.log(response.data[0]);
      UserServices.updateAlias(userId, response.data[0].id, {
        title: userInfo.value.title,
        gamerTag: userInfo.value.gamerTag,
      }).then((response) => {
        console.log(response);
      });
    }
  });
}

// retrieve the user's current information from the backend
function getUser() {
  let userId = Utils.getStore("user").userId;
  UserServices.getUser(userId).then((response) => {
    userInfo.value = { ...response.data }; // Assign the values from the database to userInfo
    getDataLists(); // get the list of titles and classifications

    UserServices.getPrimaryAlias(userId).then((response) => {
      console.log(response.data[0]);
      if (response.data.length > 0) {
        // check if there is a primary alias
        userInfo.value.gamerTag = response.data[0].gamerTag;
        userInfo.value.title = parseInt(response.data[0].title);
      }
      // set to true so the components know that the data need is ready
      userInfoLoaded.value = true;
    });
  });
}

function getEmergencyContacts() {
  UserServices.getEmergencyContacts(Utils.getStore("user").userId).then(
    (response) => {
      console.log(response.data);
      if (response.data.length > 0) {
        for (let i = 0; i < response.data.length; i++) {
          addContact(response.data[i]);
        }
      } else {
        addContact();
      }
    }
  );
}

const getDataLists = () => {
  TitleServices.getTitles().then((response) => {
    titles.value = response.data.map((title) => {
      return { name: title.name, value: title.id };
    });
  });

  // get the list of classifications supported
  UserServices.getClassifications().then((response) => {
    classifications.value = response.data;
  });
};

onMounted(() => {
  // initialize user information
  getEmergencyContacts();
  getUser();
  Object.assign(userInfo.value, Utils.getStore("user")); // info from google auth
  console.log(userInfo.value.gamerTag);
  // get the list of supported titles from the backend
});
</script>

<script>
export default {
  computed: {
    cols() {
      const { xs, sm } = this.$vuetify.display;
      return xs ? 12 : sm ? 10 : 6;
    },
  },
};
</script>

<template>
  <v-container class="pa-0">
    <v-col :cols="cols" class="mx-auto pa-0">
      <v-card v-if="userInfoLoaded">
        <v-container class="pa-4">
          <v-card-title primary-title>
            {{ "Hello, " + userInfo.fName + "!" }}
          </v-card-title>
          <p class="pa-4">
            Please fill out the following information to complete your account
            setup.
          </p>
          <v-form class="mt-4">
            <ComboBox
              v-model="userInfo.classification"
              :items="classifications"
              label="Classification"
            />

            <TextField v-model="userInfo.phoneNumber" label="Phone #" />

            <TextField v-model="userInfo.city" label="City" />

            <TextField v-model="userInfo.state" label="State" />

            <TextField v-model="userInfo.country" label="Country" />

            <title>Expected Graduation Date</title>
            <MonthYearPicker
              v-model="userInfo.expectedGradDate"
              :errors="
                v$.$errors
                  .filter(
                    (e) => e.$property == 'month' || e.$property == 'year'
                  )
                  .map((e) => e.$message)
              "
            />

            <TextField v-model="userInfo.gamerTag" label="Gamertag" />

            <!--This has to be a v-select because v-combobox doesn't destructure
            Javascript objects -->
            <v-select
              name="title"
              label="What game do you play?"
              class="pa-2"
              :items="titles"
              item-title="name"
              item-value="value"
              v-model="userInfo.title"
              :error-messages="v$.title.$errors.map((e) => e.$message)"
              @input="v$.title.$touch"
              @blur="v$.title.$touch"
            ></v-select>

            <ComboBox
              v-model="userInfo.shirtSize"
              :items="sizes"
              label="Shirt Size"
            />

            <ComboBox
              v-model="userInfo.pantSize"
              :items="sizes"
              label="Pant Size"
            />

            <YesNoRadio
              v-model="userInfo.outsidePC"
              label="Do you have a PC in your Dorm/Housing that you can compete with?"
            />

            <YesNoRadio
              v-model="userInfo.fullVacc"
              label="Are you fully vaccinated? (with booster)"
            />

            <EmergencyContact
              v-for="contact in emergencyContacts"
              :key="emergencyContacts.indexOf(contact)"
              :index="emergencyContacts.indexOf(contact)"
              :model-value="contact"
              @deleteContact="removeContact(contact)"
            />
            <v-btn
              color="secondary"
              class="w-50 mx-auto d-block"
              @click="addContact"
              >Add contact</v-btn
            >
          </v-form>
        </v-container>
        <v-container class="mt-0">
          <v-btn
            color="secondary"
            class="w-100 mx-auto ma-4"
            @click="validateForm"
            >Save</v-btn
          >
          <v-btn color="accent" class="w-100 mx-auto ma-4">Cancel</v-btn>
        </v-container>
      </v-card>
    </v-col>
  </v-container>
</template>
