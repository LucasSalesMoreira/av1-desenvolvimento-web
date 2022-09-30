package com.example.av1desenvolvimentoweb.utils

import com.example.av1desenvolvimentoweb.dto.PostDTO
import com.example.av1desenvolvimentoweb.dto.PostListDTO
import com.google.gson.Gson
import java.io.File
import java.io.PrintWriter
import java.lang.RuntimeException
import java.util.UUID

class JsonUtil {
    companion object {
        fun getPosts(file: File) = Gson().fromJson(file.reader(), PostListDTO::class.java)

        fun getPostById(file: File, id: String) = getPosts(file).posts.filter { it.id.equals(id) }.first()

        fun savePost(file: File, postDTO: PostDTO): PostDTO {
            var posts = ArrayList(getPosts(file).posts)

            if (postDTO.id.equals(null)) {
                posts = create(posts, postDTO)
            } else {
                posts = update(posts, postDTO)
            }

            return writeInJson(file, posts, postDTO)!!
        }

        fun deletePost(file: File, id: String): Boolean {
            var posts = ArrayList(getPosts(file).posts)
            val index = getIndexById(posts, id)
            posts.removeAt(index)

            if (getIndexById(posts, id) == -1)
                writeInJson(file, posts, null)
                return true
            return false
        }

        private fun getIndexById(posts: ArrayList<PostDTO>, id: String) = posts.indexOfFirst { it.id.equals(id) }

        private fun create(posts: ArrayList<PostDTO>, postDTO: PostDTO): ArrayList<PostDTO> {
            postDTO.id = UUID.randomUUID().toString()
            posts.add(postDTO)
            return posts
        }

        private fun update(posts: ArrayList<PostDTO>, postDTO: PostDTO): ArrayList<PostDTO> {
            val index = posts.indexOfFirst { it.id.equals(postDTO.id) }
            if (index !== -1)
                posts[index] = postDTO
            else
                throw RuntimeException()
            return posts
        }

        private fun writeInJson(file: File, posts: ArrayList<PostDTO>, postDTO: PostDTO?): PostDTO? {
            try {
                PrintWriter(file).use { it.print(Gson().toJson(PostListDTO(posts))) }
                if (postDTO != null)
                    return getPostById(File(file.absolutePath), postDTO.id!!)
                return null
            } catch (e: Exception) {
                throw RuntimeException()
            }
        }
    }
}