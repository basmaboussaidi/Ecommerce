package com.basma.ecommerce.controller;

import com.basma.ecommerce.model.ApplicationUser;
import com.basma.ecommerce.repository.ApplicationUserRepository;
import com.basma.ecommerce.service.ApplicationUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class ApplicationUserController  {

	@Autowired
	private ApplicationUserService userDetailsService;

	@Autowired
	private ApplicationUserRepository userRepository;


	@RequestMapping(value = "current", method = RequestMethod.GET)
	public UserDetails getCurrent(Authentication authentication) {
		JwtAuthenticationToken token = (JwtAuthenticationToken) authentication;
		Map<String, Object> attributes = token.getTokenAttributes();
		return userDetailsService.loadUserByUsername(attributes.get("username").toString());
	}


	@GetMapping(value = "/all")
	public List<ApplicationUser> getAll() {
		return userRepository.findAll();
	}


	@GetMapping(value = "/{username}")
	public ApplicationUser get(@PathVariable("username") String username) {
		return userRepository.findByUsername(username);
	}


	@PostMapping(value = "/add")
	public ApplicationUser persist(@RequestBody final ApplicationUser user) {
		userRepository.save(user);
		return userRepository.findById(user.getId()).get();
	}


	@DeleteMapping(value = "/delete/{id}")
	public List<ApplicationUser> delete(@PathVariable int id) {
		userRepository.deleteById(id);
		return userRepository.findAll();
	}


	@PutMapping(value = "/{id}/put")
	public List<ApplicationUser> put(@PathVariable int id, @RequestBody ApplicationUser user) {
		if (userRepository.existsById(id)) {
			userRepository.deleteById(id);
			userRepository.save(user);
		}

		return userRepository.findAll();
	}
}
