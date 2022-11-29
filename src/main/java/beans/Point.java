package beans;

import lombok.*;
import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@ToString
public class Point implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private long id;
    @Column(name = "x", nullable = false)
    private double x;
    @Column(name = "y", nullable = false)
    private double y;
    @Column(name = "r", nullable = false)
    private double r;
    @Column(name = "hit", nullable = false)
    private boolean hit;


    public Point() {}

    public void checkHit() {
        hit = (x<=0 && y>=0 && x>=-r/2 && y<=r) || (x<=0 && y<=0 && (x*x + y*y <= r*r/4)) || (x>=0 && y<=0 && (x-y<r/2));
    }

    public String getClassHit() {
        return hit ? "hit" : "miss";
    }

    public String getStringHit() {
        return hit ? "Попадание" : "Промах";
    }
}
