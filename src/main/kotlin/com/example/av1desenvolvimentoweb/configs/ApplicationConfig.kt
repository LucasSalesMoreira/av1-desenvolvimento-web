package com.example.av1desenvolvimentoweb.configs

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "app")
class ApplicationConfig {
    lateinit var jsonPath: String
}