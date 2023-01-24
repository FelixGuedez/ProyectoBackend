export const config = {
    mongodb: {
        cnxStr: 'mongodb+srv://admincoder:admincoder@cluster0.s42gldd.mongodb.net/ecommerce?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreatexIndex: true,
            serverSelectionTimeoutMS: 5000
        }

    },
    firebase: {
        "type": "service_account",
        "project_id": "proyecto-backend-a8d5d",
        "private_key_id": "5a87c95f6e75dbe27ae6c2fb14a9d821e846cc63",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvzZvqSAU046cg\nmDbQvTu/+qnmp1O14IHQMlLywXdrIlFFzyjeaqp8ocqxZrD0zwu8Q7jM7uRVXCAc\n/SuEb1m20LtxF7EnrKBMlbzgAYSrlJP9TL52xrGjeUTKIMPDr6qOmfmUKg+8ld7G\n81Z3hcV20PX5Cbn2B+kyvXCwUXneIhQPGAVQud5KETTEP/Xtuf/wCQHJ9vWQ2rWN\nRK8F84KGxA7ALZDuM8SHLFN7MbrvqrBJTZgTpuM1FJ04zBoqZeB5/6elJj9oY6u2\nsU8SvhTZb7TCNHJawdizldm4Tl4CGPVhJY7JJYGNBiPJ5G1NBBzsBrquAodeDjtQ\nE/hjz73VAgMBAAECggEAP/g5/qLcOiWIP8UDVSs2XaHxRrumKy0ZL0/QfQLG2FXx\nasx5m40GojkhDzJFu57HL2cZDID01tah3MqGljcKVwpW2kz7qmsXHSbzRjNnOiPj\nQa02NPQR2WEcFcycT01Ra3g9p5syhLWoDY6n7O/hLV3V0xul7g9s3IiwQ4gyJxB1\nJf9LYl4Epnu+cFQSR8QiglOQ5tG/3VG2gW9rKOTUHF2BQxiaENjhIys0D0ZYTSNh\nA4r9uhivxQquIDHAVl4WNXkG5505VTmFqjXxluoHxFy2aHOQlKs066ZptnusuH3P\nvbDNAX2uTN8pnSUAtX/zK8FXy3/1AwNYgO/19O0oFQKBgQD35ufdF+0RDV7ES8iA\njmEmRQgcylRnBR87j+AVQs4GhyYYwwVp1+fqbtsiXTn9yGLQG7PFORYd0Ew1XFbg\nE/WnYGFbOz4NDEz5VI0cBDORgaJOlMPsfTbYxKayjx/46iux5kkaevZ/DOVbb3Xt\n9s5FWjJB+vPYxE83boPeTNKt1wKBgQC1i8XdYV/XGObnEjsT5kLqXen2PulTdYaj\n5efG9uaF32p1NwKAwKm4R2XNAdDh4j8q+y2UJiscb9MNmg1Ir6UsUb0rKQMOd6sv\nmbiix06X18J2aD8pnbxdORE2KK7p0gvbLBpFMlcTTkTu6RKz/25w6bv1E/n9cII/\nueyFhGZEMwKBgQCLBtIt6kcncwocqCuP/Ul6fuhnzQi8peC4NJ4FDmwguRaieGzG\nyTDlBrqacRIew4y3DXIqPzOqELFMk7adAFSaQ7EVywmno6hfhA2HEswg5ES0MTYX\noLlrpA2gwie6HwnWQUHqOd+XrRHLz5yhkfJobocU/bpXbPDIM5B80TSuDQKBgDUk\nZRcYmeVs9KpPO9vnW08fjoz2fXZgwLjZY69qNrCZZaBKKgFmZEf9Hl+UWIDGqZb7\nT6w+QABi+3TP03OjdsYyZx1rM+nYPdQBO3rqvKbWEaZ3fYXBFpJzUgZ4gjsPsUjG\n8CmxQqv0DVmiAEeQTdPfl5V184esl3PwCLxMtWLhAoGBAIYldrBoGe+ZADzZ+zMn\nlZy2fYD6BWOdGKpzkKNJZA5UZqN4E4s0KvfG1eDf2859/oyZmmN/Q5bnY8KliZPM\nseLpaXjQjtjhkx/C+CPaA1BzKsOnM1zcwK86S2P+uUfvwy3WxarJhd08ilb6Li4g\nYv5mGgDT26GdqbOtCMK2TerX\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-9xnb3@proyecto-backend-a8d5d.iam.gserviceaccount.com",
        "client_id": "100871593256828615302",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9xnb3%40proyecto-backend-a8d5d.iam.gserviceaccount.com"
    },

    isAdmin: true
}