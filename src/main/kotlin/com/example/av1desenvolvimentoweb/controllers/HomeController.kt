package com.example.av1desenvolvimentoweb.controllers

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/homepage")
class HomeController {
    @GetMapping
    fun showHomePage(response: HttpServletResponse): ResponseEntity<Any> {
        return ResponseEntity.ok(response.sendRedirect("/public/index.html"))
    }
}