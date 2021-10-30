package com.basma.ecommerce.controller;

import com.basma.ecommerce.model.ApplicationUser;
import com.basma.ecommerce.security.JwtHelper;
import com.basma.ecommerce.service.ApplicationUserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
public class AuthController {

	private final JwtHelper jwtHelper;
	private final ApplicationUserService applicationUserService;
	private final AuthenticationManager authenticationManager;

	public AuthController(JwtHelper jwtHelper,
						  ApplicationUserService applicationUserService,
						  AuthenticationManager authenticationManager) {
		this.jwtHelper = jwtHelper;
		this.applicationUserService = applicationUserService;
		this.authenticationManager = authenticationManager;
	}

	@PostMapping("register")
	public ApplicationUser register(@RequestBody ApplicationUser user) {
		return applicationUserService.create(user);
	}

	@PostMapping("login")
	public ResponseEntity<String> login(@RequestBody ApplicationUser request) {
		try {
			Authentication authenticate = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

			ApplicationUser user = (ApplicationUser) authenticate.getPrincipal();


			Map<String, String> claims = new HashMap<>();
			claims.put("username", user.getUsername());

			String authorities = user.getAuthorities().stream()
					.map(GrantedAuthority::getAuthority)
					.collect(Collectors.joining(","));
			claims.put("authorities", authorities);
			claims.put("userId", String.valueOf(1));

			String jwt = jwtHelper.createJwtForClaims(user.getUsername(), claims);
			jwt = "{\"jwt\":\""+jwt+"\"}";

			return ResponseEntity.ok()
					.header(HttpHeaders.AUTHORIZATION, jwt)
					.body(jwt);
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
	}
}
