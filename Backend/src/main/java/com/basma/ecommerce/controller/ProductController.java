package com.basma.ecommerce.controller;

import java.util.List;

import com.basma.ecommerce.model.Product;
import com.basma.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/products")
public class ProductController {


	@Autowired
	private ProductRepository productRepository;


	@GetMapping(value = "/all")
	public List<Product> getAll() {
		return productRepository.findAll();
	}


	@GetMapping(value = "/{id}")
	public Product get(@PathVariable("id") int id) {
		return productRepository.findById(id).get();
	}


	@PostMapping(value = "/add")
	public List<Product> persist(@RequestBody final Product product) {
		productRepository.save(product);
		return productRepository.findAll();
	}


	@DeleteMapping(value = "/delete")
	public List<Product> delete(@PathVariable int id) {
		productRepository.deleteById(id);
		return productRepository.findAll();
	}


	@PutMapping(value = "/put/{id}")
	public List<Product> put(@PathVariable int id, @RequestBody Product product) {
		if (productRepository.existsById(id)) {
			productRepository.deleteById(id);
			productRepository.save(product);
		}
		
		return productRepository.findAll();
	}
}
