export const BASE_API_URL = "https://patientreviewnetwork.win/";

export const DAYS_WEEK = [
  {
    name: 'Monday',
    id: 'mon',
    valueId: 'mon',
  },
  {
    name: 'Tuesday',
    id: 'tue',
    valueId: 'mon',
  },
  {
    name: 'Wednesday',
    id: 'wed',
    valueId: 'mon',
  },
  {
    name: 'Thursday',
    id: 'thu',
    valueId: 'mon',
  },
  {
    name: 'Friday',
    id: 'fri',
    valueId: 'mon',
  },
  {
    name: 'Saturday',
    id: 'sat',
    valueId: 'mon',
  },
  {
    name: 'Sunday',
    id: 'sun',
    valueId: 'mon',
  },
];

//IMPORTANT NOTE: options which id starts with 'no_' will have that field turned to false on the request
//OTHER IMPORTANT NOTE: options with valueId will end up as a list on the url
//YET ANOTHER IMPORTANT NOTE: exclusive on an option means only one can be chosen

export const CATEGORIES = [
  {
    name: 'Substance Use Services',
    id: 'sa',
    code: 'substance-abuse',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat porttitor dignissim. Cras metus ligula, pellentesque vitae purus nec, aliquam suscipit turpis. Suspendisse tincidunt nisi sed tellus congue iaculis. Maecenas mattis magna sed est hendrerit blandit. Morbi placerat laoreet justo, at egestas justo dictum id. Morbi fermentum dolor bibendum, fringilla lectus quis, ultrices mi. Vivamus sed magna nisi. Curabitur imperdiet posuere erat, nec tristique nisl hendrerit ut. Proin quis fermentum turpis.',
    filters: [
      {
        name: 'Type of Care',
        id: 'sa_type_of_care',
        options: [
          {
            name: 'Substance abuse treatment',
            id: '',
          },
          {
            name: 'Detoxification',
            id: '',
          },
          {
            name: 'Transitional housing or halfway house',
            id: '',
          },
          {
            name: 'Accepts clients on opioid medication',
            id: '',
          },
          {
            name: 'Prescribes/administer buprenorphine and/or naltrexone',
            id: '',
          },
          {
            name: 'SAMHSA-certified Opioid Treatment Program',
            id: '',
          },
        ],
      },
      {
        name: 'Service Setting',
        id: 'sa_service_setting',
        options: [
          {
            name: 'Hospital inpatient',
            id: '',
          },
          {
            name: 'Residential',
            id: '',
          },
          {
            name: 'Outpatient',
            id: '',
          },
          {
            name: 'Short-term residential',
            id: '',
          },
          {
            name: 'Long-term residential',
            id: '',
          },
          {
            name: 'Residential detoxification',
            id: '',
          },
          {
            name: 'Outpatient detoxification',
            id: '',
          },
          {
            name: 'Outpatient methadone/buprenorphine or naltrexone',
            id: '',
          },
          {
            name: 'Intensive outpatient treatment',
            id: '',
          },
          {
            name: 'Regular outpatient treatment',
            id: '',
          },
          {
            name: 'Hospital inpatient detoxification',
            id: '',
          },
          {
            name: 'Hospital inpatient treatment',
            id: '',
          },
        ],
      },
      {
        name: 'Payment/Insurance Accepted',
        id: 'sa_payment_or_insurance_accepted',
        options: [
          {
            name: 'No payment accepted',
            id: '',
          },
          {
            name: 'Cash or self-payment',
            id: '',
          },
          {
            name: 'Medicaid',
            id: '',
          },
          {
            name: 'Medicare',
            id: '',
          },
          {
            name: 'State financed health insurance plan other than Medicaid',
            id: '',
          },
          {
            name: 'Private health insurance',
            id: '',
          },
          {
            name: 'Military insurance',
            id: '',
          },
          {
            name: 'IHS/Tribal/Urban (ITU) funds',
            id: '',
          },
        ],
      },
      {
        name: 'Payment Assistance Available',
        id: 'sa_payment_assistance_available',
        options: [
          {
            name: 'Sliding fee scale (fee is based on income and other factors)',
            id: '',
          },
          {
            name: 'Payment assistance (check with facility for details)',
            id: '',
          },

        ],
      },

      {
        name: 'Special Programs/Groups Offered',
        id: 'sa_special_programs_and_groups_offered',
        options: [
          {
            name: 'Persons with co-occurring mental and substance abuse disorders',
            id: '',
          },
          {
            name: 'Lesbian, gay, bisexual, or transgender (LGBT) clients',
            id: '',
          },
          {
            name: 'Veterans',
            id: '',
          },
          {
            name: 'Active duty military',
            id: '',
          },
          {
            name: 'Military families',
            id: '',
          },
          {
            name: 'Clients referred from the court/judicial system',
            id: '',
          },
          {
            name: 'Seniors or older adults',
            id: '',
          },
          {
            name: 'Adolescents',
            id: '',
          },
          {
            name: 'Pregnant/postpartum women',
            id: '',
          },
          {
            name: 'Adult women',
            id: '',
          },
          {
            name: 'Adult men',
            id: '',
          },
          {
            name: 'Persons with HIV or AIDS',
            id: '',
          },
          {
            name: 'Persons who have experienced trauma',
            id: '',
          },
          {
            name: 'Persons who have experienced sexual abuse',
            id: '',
          },
          {
            name: 'Persons who have experienced intimate partner violence, domestic violence',
            id: '',
          },
          {
            name: 'Transitional age young adults',
            id: '',
          },

        ],
      },
      {
        name: 'Ancillary Services',
        id: 'sa_ancillary_services',
        options: [
          {
            name: 'Treatment for gambling disorder',
            id: '',
          },
          {
            name: 'Treatment for internet use disorder',
            id: '',
          },

        ],
      },
      {
        name: 'Age Groups Accepted',
        id: 'sa_age_groups_accepted',
        options: [
          {
            name: 'Children/adolescents',
            id: '',
          },
          {
            name: 'Young adults',
            id: '',
          },
          {
            name: 'Adults',
            id: '',
          },

        ],
      },
      {
        name: 'Gender Accepted',
        id: '',
        options: [
          {
            name: 'Female',
            id: '',
          },
          {
            name: 'Male',
            id: '',
          },

        ],
      },
      {
        name: 'Exclusive Services',
        id: 'sa_exclusive_services',
        options: [
          {
            name: 'Methadone and buprenorphine clients only',
            id: '',
          },
          {
            name: 'Methadone clients only',
            id: '',
          },
          {
            name: 'DUI/DWI clients',
            id: '',
          },
          {
            name: 'Serve only DWI clients',
            id: '',
          },

        ],
      },
      {
        name: 'Language Services',
        id: 'sa_language_services',
        options: [
          {
            name: 'Services for the deaf and hard of hearing',
            id: '',
          },

        ],
      },
      {
        name: 'Other Languages',
        id: 'sa_other_languages',
        options: [
          {
            name: 'Arabic',
            id: '',
          },
          {
            name: 'Any Chinese Language',
            id: '',
          },
          {
            name: 'Creole',
            id: '',
          },
          {
            name: 'Farsi',
            id: '',
          },
          {
            name: 'French',
            id: '',
          },
          {
            name: 'German',
            id: '',
          },
          {
            name: 'Greek',
            id: '',
          },
          {
            name: 'Hebrew',
            id: '',
          },
          {
            name: 'Hindi',
            id: '',
          },
          {
            name: 'Hmong',
            id: '',
          },
          {
            name: 'Italian',
            id: '',
          },
          {
            name: 'Japanese',
            id: '',
          },
          {
            name: 'Korean',
            id: '',
          },
          {
            name: 'Polish',
            id: '',
          },
          {
            name: 'Portuguese',
            id: '',
          },
          {
            name: 'Russian',
            id: '',
          },
          {
            name: 'Spanish',
            id: '',
          },

        ],
      },

    ]
  },
  {
    name: 'Buprenorphine Physicians',
    id: 'bp',
    code: 'buprenorphine-physicians',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat porttitor dignissim. Cras metus ligula, pellentesque vitae purus nec, aliquam suscipit turpis. Suspendisse tincidunt nisi sed tellus congue iaculis. Maecenas mattis magna sed est hendrerit blandit. Morbi placerat laoreet justo, at egestas justo dictum id. Morbi fermentum dolor bibendum, fringilla lectus quis, ultrices mi. Vivamus sed magna nisi. Curabitur imperdiet posuere erat, nec tristique nisl hendrerit ut. Proin quis fermentum turpis.',
    filters: [],
  },
  {
    name: 'Mental Health Services',
    id: 'mh',
    code: 'mental-health',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat porttitor dignissim. Cras metus ligula, pellentesque vitae purus nec, aliquam suscipit turpis. Suspendisse tincidunt nisi sed tellus congue iaculis. Maecenas mattis magna sed est hendrerit blandit. Morbi placerat laoreet justo, at egestas justo dictum id. Morbi fermentum dolor bibendum, fringilla lectus quis, ultrices mi. Vivamus sed magna nisi. Curabitur imperdiet posuere erat, nec tristique nisl hendrerit ut. Proin quis fermentum turpis.',
    filters: [
      {
        name: 'Emergency Mental Health Services',
        id: 'mh_emergency_mental_health_services',
        options: [
          {
            name: 'Crisis intervention team',
            id: '',
          },
          {
            name: 'Psychiatric emergency walk-in services',
            id: '',
          },

        ]
      },
      {
        name: 'Type of Care',
        id: 'mh_type_of_care',
        options: [
          {
            name: 'Mental health treatment',
            id: '',
          },

        ]
      },
      {
        name: 'Service Setting',
        id: 'mh_service_setting',
        options: [
          {
            name: 'Hospital inpatient',
            id: '',
          },
          {
            name: 'Residential',
            id: '',
          },
          {
            name: 'Partial hospitalization/day treatment',
            id: '',
          },
          {
            name: 'Outpatient',
            id: '',
          },

        ],
      },
      {
        name: 'Facility Operation (e.g. Private, Public)',
        id: 'mh_facility_operation',
        options: [
          {
            name: 'U.S. Department of Veterans Affairs',
            id: '',
          },

        ],
      },
      {
        name: 'Payment/Insurance Accepted',
        id: 'mh_payment_or_insurance_accepted',
        options: [

          {
            name: 'Cash or self-payment',
            id: '',
          },
          {
            name: 'Medicaid',
            id: '',
          },
          {
            name: 'Medicare',
            id: '',
          },
          {
            name: 'State financed health insurance plan other than Medicaid',
            id: '',
          },
          {
            name: 'Private health insurance',
            id: '',
          },
          {
            name: 'Military insurance',
            id: '',
          },
          {
            name: 'IHS/Tribal/Urban (ITU) funds',
            id: '',
          },
        ],
      },
      {
        name: 'Payment Assistance Available',
        id: 'mh_payment_assistance_available',
        options: [
          {
            name: 'Sliding fee scale (fee is based on income and other factors)',
            id: '',
          },
          {
            name: 'Payment assistance (check with facility for details)',
            id: '',
          },

        ],
      },
      {
        name: 'Special Programs/Groups Offered',
        id: 'mh_special_programs_and_groups_offered',
        options: [
          {
            name: 'Persons with co-occurring mental and substance abuse disorders',
            id: '',
          },
          {
            name: 'Lesbian, gay, bisexual, or transgender (LGBT) clients',
            id: '',
          },
          {
            name: 'Veterans',
            id: '',
          },
          {
            name: 'Active duty military',
            id: '',
          },
          {
            name: 'Military families',
            id: '',
          },
          {
            name: 'Clients referred from the court/judicial system',
            id: '',
          },
          {
            name: 'Seniors or older adults',
            id: '',
          },
          {
            name: 'Persons with HIV or AIDS',
            id: '',
          },
          {
            name: 'Persons who have experienced trauma',
            id: '',
          },
          {
            name: 'Children with serious emotional disturbance (SED)',
            id: '',
          },
          {
            name: 'Persons with serious mental illness (SMI)',
            id: '',
          },
          {
            name: 'Persons with Alzheimer\'s or dementia',
            id: '',
          },
          {
            name: 'Persons with post-traumatic stress disorder (PTSD)',
            id: '',
          },
          {
            name: 'Persons with traumatic brain injury (TBI)',
            id: '',
          },
          {
            name: 'Transitional age young adults',
            id: '',
          },
          {
            name: 'Persons with eating disorders',
            id: '',
          },

        ],
      },
      {
        name: 'Age Groups Accepted',
        id: 'mh_age_groups_accepted',
        options: [
          {
            name: 'Children/adolescents',
            id: '',
          },
          {
            name: 'Young adults',
            id: '',
          },
          {
            name: 'Adults',
            id: '',
          },
          {
            name: 'Seniors (65 or older)',
            id: '',
          },
        ],
      },
      {
        name: 'Language Services',
        id: 'mh_language_services',
        options: [
          {
            name: 'Services for the deaf and hard of hearing',
            id: '',
          },

        ],
      },
      /* {
         name: 'American Indian or Alaskan Native Languages',
         id: '',
         options: [
           {
             name: 'Hopi',
             id: '',
           },
           {
             name: 'Lakota',
             id: '',
           },
           {
             name: 'Navajo',
             id: '',
           },
           {
             name: 'Ojibwa',
             id: '',
           },
           {
             name: 'Yupik',
             id: '',
           },

         ],
       },*/
      {
        name: 'Other Languages',
        id: 'mh_other_languages',
        options: [
          {
            name: 'Arabic',
            id: '',
          },
          {
            name: 'Any Chinese Language',
            id: '',
          },
          {
            name: 'Creole',
            id: '',
          },
          {
            name: 'Farsi',
            id: '',
          },
          {
            name: 'French',
            id: '',
          },
          {
            name: 'German',
            id: '',
          },
          {
            name: 'Greek',
            id: '',
          },
          {
            name: 'Hebrew',
            id: '',
          },
          {
            name: 'Hindi',
            id: '',
          },
          {
            name: 'Hmong',
            id: '',
          },
          {
            name: 'Italian',
            id: '',
          },
          {
            name: 'Japanese',
            id: '',
          },
          {
            name: 'Korean',
            id: '',
          },
          {
            name: 'Polish',
            id: '',
          },
          {
            name: 'Portuguese',
            id: '',
          },
          {
            name: 'Russian',
            id: '',
          },
          {
            name: 'Spanish',
            id: '',
          },

        ],
      },
    ],
  },
  {
    name: 'Health Care Centers',
    id: 'hc',
    code: 'health-care-centers',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat porttitor dignissim. Cras metus ligula, pellentesque vitae purus nec, aliquam suscipit turpis. Suspendisse tincidunt nisi sed tellus congue iaculis. Maecenas mattis magna sed est hendrerit blandit. Morbi placerat laoreet justo, at egestas justo dictum id. Morbi fermentum dolor bibendum, fringilla lectus quis, ultrices mi. Vivamus sed magna nisi. Curabitur imperdiet posuere erat, nec tristique nisl hendrerit ut. Proin quis fermentum turpis.',
    filters: [],
  },
  {
    name: 'Naloxone',
    id: 'nal',
    code: 'naloxone-access',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat porttitor dignissim. Cras metus ligula, pellentesque vitae purus nec, aliquam suscipit turpis. Suspendisse tincidunt nisi sed tellus congue iaculis. Maecenas mattis magna sed est hendrerit blandit. Morbi placerat laoreet justo, at egestas justo dictum id. Morbi fermentum dolor bibendum, fringilla lectus quis, ultrices mi. Vivamus sed magna nisi. Curabitur imperdiet posuere erat, nec tristique nisl hendrerit ut. Proin quis fermentum turpis.',
    filters: [
      {
        name: 'Day of the Week',
        id: 'nal_days_of_week',
        options: DAYS_WEEK,
      },
    ],
  },
  {
    name: 'Syringe Exchange Program',
    id: 'sep',
    code: 'syringe-exchange-programs',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat porttitor dignissim. Cras metus ligula, pellentesque vitae purus nec, aliquam suscipit turpis. Suspendisse tincidunt nisi sed tellus congue iaculis. Maecenas mattis magna sed est hendrerit blandit. Morbi placerat laoreet justo, at egestas justo dictum id. Morbi fermentum dolor bibendum, fringilla lectus quis, ultrices mi. Vivamus sed magna nisi. Curabitur imperdiet posuere erat, nec tristique nisl hendrerit ut. Proin quis fermentum turpis.',
    filters: [
      {
        name: 'Day of the Week',
        id: 'sep_days_of_week',
        options: DAYS_WEEK,
      },
    ],
  },
  {
    name: 'Alcoholics Anonymous Meetings',
    id: 'aa_location',
    code: 'aa-locations',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat porttitor dignissim. Cras metus ligula, pellentesque vitae purus nec, aliquam suscipit turpis. Suspendisse tincidunt nisi sed tellus congue iaculis. Maecenas mattis magna sed est hendrerit blandit. Morbi placerat laoreet justo, at egestas justo dictum id. Morbi fermentum dolor bibendum, fringilla lectus quis, ultrices mi. Vivamus sed magna nisi. Curabitur imperdiet posuere erat, nec tristique nisl hendrerit ut. Proin quis fermentum turpis.',
    filters: [
      {
        name: 'Day of the Week',
        id: 'aa_days_of_week',
        options: DAYS_WEEK,
      },
      {
        name: 'Who Can Attend',
        id: 'aa_who_can_attend',
        options: [
          {
            name: 'Open to family and friends',
            id: 'is_open_to_family_members_and_friends',
            valueId: 'is_open_to_family_members_and_friends',
          },
          /*   {
               name: 'Closed',
               id: 'no_is_open_to_family_members_and_friends',
               valueId: 'is_open_to_family_members_and_friends',
             },*/
          {
            name: 'Men Only',
            id: 'is_men_only',
            valueId: 'is_men_only',
          },
          {
            name: 'Women Only',
            id: 'is_women_only',
            valueId: 'is_women_only',
          },
          {
            name: 'Newcomer',
            id: 'is_open_to_newcomers',
            valueId: 'is_open_to_newcomers',
          },
          {
            name: 'Child-Friendly',
            id: 'is_child_friendly',
            valueId: 'is_child_friendly',
          },
          {
            name: 'Young People',
            id: 'is_young_people',
            valueId: 'is_young_people',
          },
          {
            name: 'Concurrent with Al-Anon',
            id: 'is_al_anon',
            valueId: 'is_al_anon',
          },
          {
            name: 'Concurrent with Alateen',
            id: 'is_alateen',
            valueId: 'is_alateen',
          },
          {
            name: 'Gay',
            id: 'is_gay',
            valueId: 'is_gay',
          },
          {
            name: 'LGBTQ',
            id: 'is_lgbtq',
            valueId: 'is_lgbtq',
          },
          {
            name: 'Lesbian',
            id: 'is_lesbian',
            valueId: 'is_lesbian',
          },
          {
            name: 'Transgender',
            id: 'is_transgender',
            valueId: 'is_transgender',
          },

        ],
      },
      {
        name: 'Wheelchair Accesible',
        id: 'aa_is_wheelchair_accessible',
        options:
          [
            {
              name: 'Wheelchair Access',
              id: 'aa_is_wheelchair_accessible',
            }
          ],

      },
      {
        name: 'Format',
        id: 'aa_formats',
        options:
          [
            {
              name: '11th Step Meditation',
              id: 'is_eleven_step',
              valueId: 'is_eleven_step',
            },
            {
              name: 'As Bill Sees It',
              id: 'is_asbi',
              valueId: 'is_asbi',

            },
            {
              name: 'Atheist / Agnostic',
              id: 'is_atheist_or_agnostic',
              valueId: 'is_atheist_or_agnostic',

            },
            {
              name: 'Birthday',
              id: 'is_birthday',
              valueId: 'is_birthday',

            },
            {
              name: 'Breakfast',
              id: 'is_breakfast',
              valueId: 'is_breakfast',
            },
            {
              name: 'Candlelight',
              id: 'is_candlelight',
              valueId: 'is_candlelight',
            },
            {
              name: 'Daily Reflections',
              id: 'is_daily_reflections',
              valueId: 'is_daily_reflections',
            },
            {
              name: 'Discussion',
              id: 'is_discussion',
              valueId: 'is_discussion',
            },
            /*  {
                name: 'Dual Diagnosis',
                id: 'is_dual_diagnosis',
                valueId:'',
              },*/
            /* {
               name: 'Fragance Free',
               id: 'is_fragrance_free',
               valueId:'',
             },*/
            {
              name: 'Step Meeting',
              id: 'is_step',
              valueId: 'is_step',
            },
            {
              name: 'Speaker',
              id: 'is_speaker',
              valueId: 'is_speaker',
            },
            {
              name: 'Literature Study',
              id: 'is_literature_study',
              valueId: 'is_literature_study',
            },
            {
              name: 'Tradition Study',
              id: 'is_tradition',
              valueId: 'is_tradition',
            },
            {
              name: 'Meditation',
              id: 'is_meditation',
              valueId: '',
            },
            {
              name: 'Big Book',
              id: 'is_big_book',
              valueId: 'is_big_book',
            },

            {
              name: 'Grapevine',
              id: 'is_grapevine',
              valueId: '',
            },
            {
              name: 'Living Sober',
              id: 'is_living_sober',
              valueId: '',
            },
            {
              name: 'Cross Talk',
              id: 'is_cross_talk',
              valueId: 'is_cross_talk',
            },
            {
              name: 'Professionals',
              id: 'is_professionals',
              valueId: 'is_professionals',
            },

          ],

      },
      {
        name: 'Smoking Permitted',
        id: 'aa_is_smoking_permitted',
        options:
          [
            {
              name: 'No Smoking',
              id: 'false',
              valueId: 'is_cross_talk',
              exclusive: true,
            },
            {
              name: 'Smoking Permitted',
              id: 'true',
              valueId: 'true',
              exclusive: true,
            },
            /*  {
                name: 'Vaping Permitted',
                id: 'is_vaping_permitted',
              },*/
          ],

      },
      {
        name: 'Cross Talk Permitted',
        id: 'aa_location_is_cross_talk',
        options:
          [
            {
              name: 'Cross Talk Permitted',
              id: 'is_cross_talk',
            },


          ],

      },
      {
        name: 'Babysitting Available',
        id: 'aa_location_is_babysitting_available',
        options:
          [
            {
              name: 'Babysitting Available',
              id: 'is_babysitting_available',
            },


          ],

      },

      {
        name: 'Language',
        id: 'aa_languages',
        options: [


          {
            name: 'French',
            id: 'is_french',
            valueId: 'is_french',
          },

          {
            name: 'Italian',
            id: 'is_italian',
            valueId: 'is_italian',
          },

          {
            name: 'Korean',
            id: 'is_korean',
            valueId: 'is_korean',
          },
          {
            name: 'Native American',
            id: 'is_native_american',
            valueId: 'is_native_american',
          },
          {
            name: 'Polish',
            id: 'is_polish',
            valueId: 'is_polish',
          },
          {
            name: 'Portuguese',
            id: 'is_portuguese',
            valueId: 'is_portuguese',
          },

          {
            name: 'Punjabi',
            id: 'is_punjabi',
            valueId: 'is_punjabi',
          },
          {
            name: 'Russian',
            id: 'is_russian',
            valueId: 'is_russian',
          },
          {
            name: 'Sign Language',
            id: 'is_sign_language',
            valueId: 'is_sign_language',
          },
          {
            name: 'Spanish',
            id: 'is_spanish',
            valueId: 'is_spanish',
          },

        ],
      },

    ],
  },
  {
    name: 'Narcotics Anonymous Meetings',
    id: 'na',
    code: 'na-locations',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat porttitor dignissim. Cras metus ligula, pellentesque vitae purus nec, aliquam suscipit turpis. Suspendisse tincidunt nisi sed tellus congue iaculis. Maecenas mattis magna sed est hendrerit blandit. Morbi placerat laoreet justo, at egestas justo dictum id. Morbi fermentum dolor bibendum, fringilla lectus quis, ultrices mi. Vivamus sed magna nisi. Curabitur imperdiet posuere erat, nec tristique nisl hendrerit ut. Proin quis fermentum turpis.',
    specialDevinCode: 'na_location',
    filters: [
      {
        name: 'Day of the Week',
        id: 'na_days_of_week',
        options: DAYS_WEEK,
      },
      {
        name: 'Who Can Attend',
        id: 'na_who_can_attend',
        options: [
          {
            name: 'Open to family and friends',
            id: 'is_open_to_family_members_and_friends',
          },
          {
            name: 'Closed - Not open to family and friends',
            id: 'no_is_open_to_family_members_and_friends',
          },
          {
            name: 'Men Only',
            id: 'is_men_only',
          },
          {
            name: 'Women Only',
            id: 'is_women_only',
          },
          {
            name: 'Beginners / Newcomers',
            id: 'is_open_to_newcomers',
          },
          {
            name: 'Children Welcome',
            id: 'is_child_friendly',
          },
          {
            name: 'Young People',
            id: 'is_young_people',
          },
          {
            name: 'Restricted',
            id: 'is_restricted_access',
          },
          {
            name: 'LGBT',
            id: 'is_lgbt',
          },

        ],
      },
      {
        name: 'Wheelchair Accesible',
        id: 'na_is_wheelchair_accessible',
        options:
          [
            {
              name: 'Yes',
              id: '',
            }
          ],

      },
      {
        name: 'Format',
        id: 'na_format',
        options:
          [
            {
              name: 'Step',
              id: 'is_step_study',
            },
            {
              name: 'Speaker',
              id: 'is_speaker',
            },
            {
              name: 'Literature Study',
              id: 'is_step_study',
            },
            {
              name: 'Tradition',
              id: 'is_tradition_study',
            },
            {
              name: '12 Concepts',
              id: 'is_12_concepts',
            },
            {
              name: 'Basic Concept',
              id: 'is_basic_text',
            },
            {
              name: 'Candle Light',
              id: 'is_candlelight',
            },
            {
              name: 'Discussion / Participation',
              id: 'is_discussion',
            },
            {
              name: 'IP Study',
              id: 'is_ip_study',
            },
            {
              name: 'Just for Today Study',
              id: 'is_just_for_today_study',
            },
            {
              name: 'Living Clean',
              id: 'is_living_clean',
            },
            {
              name: 'Meditation',
              id: 'is_meditation',
            },
            {
              name: 'Q & A',
              id: 'is_q_and_a',
            },
            {
              name: 'Step Working Guide',
              id: 'is_step_working_guide',
            },
            {
              name: 'Topic',
              id: 'is_topic',
            },
            {
              name: 'Format Varies',
              id: 'does_format_vary',
            },

          ],

      },
      {
        name: 'Smoking Permitted',
        id: 'na_facility_smoking_policy',
        options:
          [
            {
              name: 'No Smoking',
              id: 'false',
            },
            {
              name: 'Smoking Permitted',
              id: 'true',
            },

          ],

      },
      {
        name: 'Language',
        id: 'na_is_spanish_speaking',
        options:
          [
            {
              name: 'Spanish',
              id: 'true',
            }
          ],

      },
    ],
  },
];

export const RATING_CATEGORIES = [
  {
    id: "respect_towards_patients_rating",
    name: "Respect towards patient",
  },
  {
    id: "discreet_location_rating",
    name: "Discreet Location",
  },
  {
    id: "confidentiality_rating",
    name: "Confidentiality",
  },
  {
    id: "wait_time_rating",
    name: "Time spent waiting",
  },
  {
    id: "privacy_of_services_rating",
    name: "Privacy of services",
  },
  {
    id: "knowledgeable_staff_rating",
    name: "Knowledgeable staff",
  },
  {
    id: "friendly_staff_rating",
    name: "Friendly staff",
  },
  {
    id: "overall_experience_rating",
    name: "Overall experience",
  },
];

export const RATINGS = [5, 4, 3, 2, 1];

export const CITIES = [
  {
    name: "Atlanta",
    fullName: "Atlanta, GA, USA",
    latitude: 33.7489954,
    longitude: -84.3879824,
    code: "atlanta",
  },
  {
    name: "Austin",
    fullName: "Austin, TX, USA",
    latitude: 30.267153,
    longitude: -97.74306079999997,
    code: "austin",
  },
  {
    name: "Chicago",
    fullName: "Chicago, IL, USA",
    latitude: 41.8781136,
    longitude: -87.62979819999998,
    code: "chicago",
  },
  {
    name: "Columbus",
    fullName: "Columbus, OH, USA",
    latitude: 39.9611755,
    longitude: -82.99879420000002,
    code: "columbus",
  },
  {
    name: "Dallas",
    fullName: "Dallas, TX, USA",
    latitude: 32.7766642,
    longitude: -96.79698789999998,
    code: "dallas",
  },
  {
    name: "Houston",
    fullName: "Houston, TX, USA",
    latitude: 29.7604267,
    longitude: -95.3698028,
    code: "houston",

  },
  {
    name: "Jersey City",
    fullName: "Jersey City, NJ, USA",
    latitude: 40.72815749999999,
    longitude: -74.07764170000002,
    code: "jersey-city",
  },
  {
    name: "Los Angeles",
    fullName: "Los Angeles, CA, USA",
    latitude: 34.0522342,
    longitude: -118.2436849,
    code: "los-angeles",
  },
  {
    name: "New York",
    fullName: "New York, NY, USA",
    latitude: 40.7127753,
    longitude: -74.0059728,
    code: "new-york",
  },
  {
    name: "Philadelphia",
    fullName: "New York, NY, USA",
    latitude: 40.7127753,
    longitude: -74.0059728,
    code: "philadelphia",
  },
  {
    name: "San Antonio",
    fullName: "San Antonio, TX, USA",
    latitude: 29.4241219,
    longitude: -98.49362819999999,
    code: "san-antonio",
  },
  {
    name: "San Diego",
    fullName: "San Diego, CA, USA",
    latitude: 32.71573,
    longitude: -117.16108380000003,
    code: "san-diego"
  },
  {
    name: "San Francisco",
    fullName: "San Francisco, CA, USA",
    latitude: 37.7749295,
    longitude: -122.41941550000001,
    code: "san-francisco",
  },
  {
    name: "Washington, DC",
    fullName: "Washington, DC, USA",
    latitude: 38.9071923,
    longitude: -77.03687070000001,
    code: "washington-dc",
  },


];




