package com.example.av1desenvolvimentoweb.services.implementations

import com.example.av1desenvolvimentoweb.configs.ApplicationConfig
import com.example.av1desenvolvimentoweb.dto.PostDTO
import com.example.av1desenvolvimentoweb.dto.PostListDTO
import com.example.av1desenvolvimentoweb.services.IPostService
import com.example.av1desenvolvimentoweb.utils.JsonUtil
import org.springframework.stereotype.Service
import java.io.File

@Service
class PostServiceImpl(val applicationConfig: ApplicationConfig): IPostService {
    override fun getPosts(): PostListDTO = JsonUtil.getPosts(File(applicationConfig.jsonPath))

    override fun createPost(postDTO: PostDTO): PostDTO {
        return JsonUtil.savePost(File(applicationConfig.jsonPath), postDTO)
    }

    override fun updatePost(id: String, postDTO: PostDTO): PostDTO {
        val file = File(applicationConfig.jsonPath)
        val savedPostDTO = JsonUtil.getPostById(file, id)

        savedPostDTO.title = postDTO.title
        savedPostDTO.body = postDTO.body
        return JsonUtil.savePost(file, savedPostDTO)
    }

    override fun deletePost(id: String): Boolean {
        return JsonUtil.deletePost(File(applicationConfig.jsonPath), id)
    }
}