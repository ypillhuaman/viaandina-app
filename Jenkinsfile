pipeline {
    agent any // ejecuta en el nodo del host

    parameters {
        credentials(name: 'DOCKER_CREDENTIALS', description: 'Docker Hub credentials')
        string(name: 'ENVIRONMENT', description: 'Environment', defaultValue: 'dev')
    }

    environment {
        SERVICE_NAME = 'app'
        IMAGE_NAME = 'yurigrow/viand-app'
        IMAGE_TAG = 'latest'
        DOCKER_COMPOSE_PATH = '/mnt/msvc'
    }

    stages {

        stage('Validar Parámetros') {
            steps {
                script {
                    if (!params.DOCKER_CREDENTIALS?.trim()) {
                        error("Parámetro DOCKER_CREDENTIALS es requerido pero está vacío.")
                    }
                }
            }
        }

        stage('Build Angular APP') {
            agent {
                docker {
                    image 'node:18'
                    args '-u root'
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run build --configuration=production'
            }
        }

        /*stage('Instalar Dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Angular App') {
            steps {
                sh 'npm run build --configuration=production'
            }
        }*/

        stage('Build Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${params.DOCKER_CREDENTIALS}") {
                        def app = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                        app.push()
                    }
                }
            }
        }

        stage('Actualizar Docker Compose') {
            steps {
                script {
                    sh """
                        cd ${DOCKER_COMPOSE_PATH}
                        APP_ENV=${params.ENVIRONMENT} docker compose pull ${SERVICE_NAME}
                        APP_ENV=${params.ENVIRONMENT} docker compose up -d ${SERVICE_NAME}
                    """
                }
            }
        }

        stage('Limpiar imágenes <none>') {
            steps {
                script {
                    echo "Buscando imágenes <none> asociadas a ${SERVICE_NAME}..."
                    sh '''
                        docker images --filter "dangling=true" --format "{{.ID}} {{.Repository}}" | \
                        grep "${SERVICE_NAME}" | \
                        awk '{print $1}' | \
                        xargs -r docker rmi
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "El pipeline se ejecutó exitosamente."
        }
        failure {
            echo "El pipeline falló. Revisa los logs para más detalles."
        }
    }
}
