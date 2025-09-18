import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const docAssets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Prof. Dr. Haridas Biswas',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Prof. Dr. Haridas Biswas is a highly experienced Medicine, Cardiology, Liver, Rheumatic Fever, and Chest Diseases specialist in Khulna.',
        fees: 1000,
        address: {
            line1: 'KDA Plot & Holding No: E X-2 (East Side of KMC)',
            line2: 'Choto Boyra, Khulna'
        }
    },
    {
        _id: 'doc2',
        name: 'Prof. Dr. Suha Jesmin',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS (DMC), FCPS (OBGYN)',
        experience: '3 Years',
        about: 'Prof. Dr. Suha Jesmin is a Gynecologist in Dhaka. Her qualification is MBBS (DMC), FCPS (OBGYN). She is a Professor, , Gynecology & Obstetrics at Anwer Khan Modern Medical College & Hospital.',
        fees: 500,
        address: {
            line1: 'House # 17, Road # 08',
            line2: 'Dhanmondi R/A, Dhaka – 1205'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Farzana Rahman Shathi',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS, BCS (Health), FCPS (Skin & VD), MCPS (Skin & Sex), DDV',
        experience: '5 Years',
        about: 'Dr. Farzana Rahman Shathi is a highly qualified Skin, Sexual Diseases, Leprosy, Allergy Specialist, and Aesthetic & Dermatosurgeon in Dhaka.',
        fees: 1000,
        address: {
            line1: 'Gemcon Business Tower, 255 New Circular Road',
            line2: 'Malibagh, Dhaka'
        }
    },
    {
        _id: 'doc4',
        name: 'Prof. Dr. Syed Khairul Amin',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '10 Years',
        about: 'Prof. Dr. Syed Khairul Amin is a Pediatric Hematologist in Dhaka. His qualification is MBBS, DCH (Glasgow), MRCP (UK), FRCP (Edin), FRCP (Glasgow).',
        fees: 1200,
        address: {
            line1: 'House # 17, Road # 08, Dhanmondi R/A',
            line2: 'Dhaka – 1205'
        }
    },
    {
        _id: 'doc5',
        name: 'Prof. Dr. Subash Kanti Dey',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS, MD (Neurology)',
        experience: '14 Years',
        about: 'Prof. Dr. Subash Kanti Dey is a Neurologist in Dhaka. His qualification is MBBS, MD (Neurology). He is a Professor (Neurology) at Bangabandhu Sheikh Mujib Medical University Hospital.',
        fees: 1000,
        address: {
            line1: 'Gemcon Business Tower, 255 New Circular Road',
            line2: 'Malibagh, Dhaka'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Mohammad Selim Shahi',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Mohammad Selim Shahi is a Neurologist in Dhaka. His qualification is MBBS, MD (Neurology). He is a Associate Professors of Neurology at National Institute of Neurosciences & Hospital. ',
        fees: 50,
        address: {
            line1: 'House # 02, Road # 06',
            line2: 'Block # A, Mirpur-10, Dhaka'
        }
    },
    {
        _id: 'doc7',
        name: 'Prof. Dr. ABM Abdullah',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '17 Years',
        about: 'Professor Dr. ABM Abdullah is a renowned medicine specialist in Bangladesh, with expertise in the treatment of medicine, diabetes, hypertension, thyroid disorders, liver diseases, gastric ulcers, heart diseases, infectious diseases, and various other chronic and complex conditions.',
        fees: 50,
        address: {
            line1: 'House # 02, Road # 05, Green Road',
            line2: 'Dhanmondi, Dhaka'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Jasmine Sultana',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '7 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 1500,
        address: {
            line1: '2/6 Begum Rokeya Avenue',
            line2: 'Pallabi, Mirpur 11.5, Dhaka'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Shakti Chowdhury',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Shakti Chowdhury is a Dermatologist in Chittagong. Her qualification is MBBS (CMC), DDV (BSMMU). She is a Consultant, Dermatology at Surecell Medical, Chattogram. ',
        fees: 100,
        address: {
            line1: 'Al-Noor Badrun Centre (3rd Floor)',
            line2: 'OR Nizam Road, Chattogram'
        }
    },
    {
        _id: 'doc10',
        name: 'Prof. Dr. Azmeri Sultana',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '7 Years',
        about: 'Prof. Dr. Azmeri Sultana is a Child Specialist in Dhaka. Her qualification is MBBS, DCH, MCPS, FCPS (CHILD), FRCP (GLASGOW)',
        fees: 40,
        address: {
            line1: ' House # B65, Chowdhury Para',
            line2: 'Malibagh, Dhaka'
        }
    },
    {
        _id: 'doc11',
        name: 'Prof. Dr. Md. Rafiqul Islam',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '14 Years',
        about: 'Prof. Dr. Md. Rafiqul Islam is a renowned neurology and medicine specialist in Dhaka, with outstanding expertise in treating neurological conditions such as stroke, epilepsy, Parkinson’s disease, migraine, neuropathy, and dementia. He holds an MBBS and FCPS (Medicine), and has completed a neurology fellowship from WHO (Thailand) along with specialized training in neurosonology from Singapore. ',
        fees: 1500,
        address: {
            line1: 'Laksam Road',
            line2: 'Cumilla'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Md. Ashrafuzzaman Khan',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS,BCS (Health), MD (Neurology)',
        experience: '8 Years',
        about: 'Dr. Md. Ashrafuzzaman Khan is a distinguished neurology specialist in Dhaka with expertise in treating brain, nerve, spine, headache, stroke, epilepsy, back pain, migraine, and neurological disorders. ',
        fees: 1000,
        address: {
            line1: ' Road # 2, Block # B',
            line2: 'Mirpur 10, Dhaka'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Hasna Fahmima Haque',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Hasna Fahmima Haque is a dedicated Internal Medicine specialist in Dhaka, with qualifications including MBBS and FCPS (Medicine). ',
        fees: 1000,
        address: {
            line1: '122, Kazi Nazrul Islam Avenue',
            line2: 'Shahbag, Dhaka'
        }
    },
    {
        _id: 'doc14',
        name: 'Asst. Prof. Dr. Sharmin Akter Liza',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '8 Years',
        about: 'Asst. Prof. Dr. Sharmin Akter Liza is one of the best gynecologist and infertility specialist in Dhaka, Bangladesh. Her qualification is MBBS, FCPS (OBGYN). She is a Assistant Professor, Gynecology & Obstetrics at Institute of Child and Mother Health (ICMH). ',
        fees: 1600,
        address: {
            line1: 'London Market, Sanarpar',
            line2: 'Demra, Dhaka - 1361'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Md. Nazmus Saleheen (Pavel)',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Pavel specializes in treating skin diseases, acne, eczema, psoriasis, fungal infections, hair fall, vitiligo, allergies, sexually transmitted diseases (STDs), and performs cosmetic skin procedures and laser treatments. ',
        fees: 1200,
        address: {
            line1: 'Arunaloy, 6 Momin Road',
            line2: 'Anderkilla, Chattogram'
        }
    },
    
]