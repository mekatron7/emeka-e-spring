package net.yorksolutions.calendarwithbackend.backend.controllers;

import net.yorksolutions.calendarwithbackend.backend.models.User;
import net.yorksolutions.calendarwithbackend.backend.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

class LoginInput {
    public String username;
    public String password;
}

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserRepo repository;

    @CrossOrigin
    @PostMapping("/register")
    String register(@RequestBody User newUser) {
        repository.save(newUser);

        return "success";
    }

    @CrossOrigin
    @GetMapping("/checkUsername")
    Boolean checkUsername(@RequestParam String username) {
        var user = repository.findByUsername(username);
        if(user.isEmpty()) return false;
        else return true;
    }

    @CrossOrigin
    @PostMapping("/login")
    String login(@RequestBody LoginInput credentials) {
        var user = repository.findByUsernameAndPassword(credentials.username, credentials.password);
        if (user.isEmpty()) {
            return "The username or password you entered is invalid. Please try again.";
        }
        else return "success";
    }

    @CrossOrigin
    @GetMapping("/getUser/{username}")
    User getUser(@PathVariable String username) {
        return repository.findByUsername(username).orElseThrow();
    }

    @CrossOrigin
    @GetMapping("/getAll")
    Iterable<User> getAll() {
        return repository.findAll();
    }
}
