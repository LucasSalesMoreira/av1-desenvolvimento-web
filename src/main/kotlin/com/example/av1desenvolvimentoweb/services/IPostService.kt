package com.example.av1desenvolvimentoweb.services

import com.example.av1desenvolvimentoweb.dto.PostDTO
import com.example.av1desenvolvimentoweb.dto.PostListDTO

interface IPostService {
    fun getPosts(): PostListDTO
    fun createPost(postDTO: PostDTO): PostDTO
    fun updatePost(id: String, postDTO: PostDTO): PostDTO
    fun deletePost(id: String): Boolean
}