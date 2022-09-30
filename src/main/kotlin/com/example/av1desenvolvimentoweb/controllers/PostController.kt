package com.example.av1desenvolvimentoweb.controllers

import com.example.av1desenvolvimentoweb.dto.PostDTO
import com.example.av1desenvolvimentoweb.services.IPostService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/post")
class PostController(val iPostService: IPostService) {
    @GetMapping
    fun getPosts(): ResponseEntity<Any> = ResponseEntity.ok(iPostService.getPosts())

    @PostMapping
    fun createPost(@RequestBody postDTO: PostDTO): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(iPostService.createPost(postDTO))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(e.message)
        }
    }

    @PatchMapping("/{id}")
    fun updatePost(@PathVariable id: String, @RequestBody postDTO: PostDTO): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(iPostService.updatePost(id, postDTO))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(e.message)
        }
    }

    @DeleteMapping("/{id}")
    fun deletePost(@PathVariable id: String): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(iPostService.deletePost(id))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(e.message)
        }
    }
}